import { GameContext } from '@/context/game-context'
import { useGameHistory } from '@/hooks/use-game-history'
import {
  checkWinner,
  confetti,
  ERROR_CELL_TIMEOUT,
  getNextPlayer,
  INITIAL_BOARD
} from '@/lib/game-utils'
import type { Cell, GameContextValue, Player, Winner } from '@/types/game'
import * as React from 'react'

function GameProvider({ children }: { children: React.ReactNode }) {
  const { addToHistory } = useGameHistory()
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X')
  const [board, setBoard] = React.useState<Cell[]>(INITIAL_BOARD)
  const [errorCell, setErrorCell] = React.useState<number | null>(null)
  const [winner, setWinner] = React.useState<Winner>(null)

  const handleClick = (index: number) => {
    if (winner || board[index] !== null) {
      setErrorCell(index)
      setTimeout(() => setErrorCell(null), ERROR_CELL_TIMEOUT)
      return
    }

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
      addToHistory(result)
      if (result !== 'Draw') confetti.addConfetti()
    } else {
      setCurrentPlayer(getNextPlayer(currentPlayer))
    }
  }

  const handleReset = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
  }

  const value: GameContextValue = {
    currentPlayer,
    board,
    errorCell,
    winner,
    isDraw: winner === 'Draw',
    isMyTurn: true,
    handleClick,
    handleReset
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export { GameProvider }
