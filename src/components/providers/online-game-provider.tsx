import { GameContext } from '@/context/game-context'
import { useApp } from '@/hooks/use-app'
import { useGameHistory } from '@/hooks/use-game-history'
import { confetti, ERROR_CELL_TIMEOUT, INITIAL_BOARD } from '@/lib/game-utils'
import { socket } from '@/lib/web-socket/connection'
import type { Cell, GameContextValue, GameStateData, Player, Winner } from '@/types/game'
import * as React from 'react'

function OnlineGameProvider({ children }: { children: React.ReactNode }) {
  const { roomCode, playerSymbol } = useApp()
  const { addToHistory, clearHistory } = useGameHistory()

  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X')
  const [board, setBoard] = React.useState<Cell[]>(INITIAL_BOARD)
  const [errorCell, setErrorCell] = React.useState<number | null>(null)
  const [winner, setWinner] = React.useState<Winner>(null)

  const isMyTurn = currentPlayer === playerSymbol

  // Limpiar historial al iniciar partida online
  React.useEffect(() => {
    clearHistory()
  }, [clearHistory])

  // Escuchar actualizaciones del estado del juego desde el servidor
  React.useEffect(() => {
    const handleGameState = (data: GameStateData) => {
      setBoard(data.board)
      setCurrentPlayer(data.currentPlayer)
      setWinner(data.winner)

      if (data.winner) {
        addToHistory(data.winner)
        if (data.winner !== 'Draw' && data.winner === playerSymbol) {
          confetti.addConfetti()
        }
      }
    }

    const handleMoveMade = (data: { index: number; player: Player; nextPlayer: Player }) => {
      setBoard((prev) => {
        const newBoard = [...prev]
        newBoard[data.index] = data.player
        return newBoard
      })
      setCurrentPlayer(data.nextPlayer)
    }

    const handleGameWinner = (data: { winner: Winner }) => {
      setWinner(data.winner)
      if (data.winner) {
        addToHistory(data.winner)
        if (data.winner !== 'Draw' && data.winner === playerSymbol) {
          confetti.addConfetti()
        }
      }
    }

    const handleGameReset = () => {
      setBoard(Array(9).fill(null))
      setCurrentPlayer('X')
      setWinner(null)
    }

    socket.on('gameState', handleGameState)
    socket.on('moveMade', handleMoveMade)
    socket.on('gameWinner', handleGameWinner)
    socket.on('gameReset', handleGameReset)

    return () => {
      socket.off('gameState', handleGameState)
      socket.off('moveMade', handleMoveMade)
      socket.off('gameWinner', handleGameWinner)
      socket.off('gameReset', handleGameReset)
    }
  }, [addToHistory, playerSymbol])

  const handleClick = (index: number) => {
    if (!isMyTurn || winner || board[index] !== null) {
      setErrorCell(index)
      setTimeout(() => setErrorCell(null), ERROR_CELL_TIMEOUT)
      return
    }

    socket.emit('makeMove', {
      roomCode,
      index,
      player: playerSymbol
    })
  }

  const handleReset = () => {
    socket.emit('resetGame', { roomCode })
  }

  const value: GameContextValue = {
    currentPlayer,
    board,
    errorCell,
    winner,
    isDraw: winner === 'Draw',
    isMyTurn,
    handleClick,
    handleReset
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export { OnlineGameProvider }
