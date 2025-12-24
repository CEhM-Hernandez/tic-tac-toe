import * as React from 'react'

type Player = 'X' | 'O'
type Cell = Player | null
type Winner = Player | 'Draw' | null

interface GameState {
  currentPlayer: Player
  board: Cell[]
  errorCell: number | null
  winner: Winner
}

interface GameContextValue extends GameState {
  handleClick: (index: number) => void
  handleReset: () => void
}

const GameContext = React.createContext<GameContextValue | null>(null)

function checkWinner(board: Cell[]): Winner {
  const size = 3
  const center = board[4]

  for (let i = 0; i < size; i++) {
    // Verificar fila i
    if (
      board[i * size] &&
      board[i * size] === board[i * size + 1] &&
      board[i * size] === board[i * size + 2]
    ) {
      return board[i * size]
    }

    // Verificar columna i
    if (board[i] && board[i] === board[i + size] && board[i] === board[i + size * 2]) {
      return board[i]
    }
  }

  // Verificar diagonales
  if (center) {
    if (board[0] === center && center === board[8]) return center
    if (board[2] === center && center === board[6]) return center
  }

  return board.every((cell) => cell !== null) ? 'Draw' : null
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentPlayer, setCurrentPlayer] = React.useState<Player>('X')
  const [board, setBoard] = React.useState<Cell[]>(Array(9).fill(null))
  const [errorCell, setErrorCell] = React.useState<number | null>(null)
  const [winner, setWinner] = React.useState<Winner>(null)

  const handleTurn = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const handleClick = (index: number) => {
    if (winner || board[index] !== null) {
      setErrorCell(index)
      setTimeout(() => setErrorCell(null), 700)
      return
    }

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result)
    } else {
      handleTurn()
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
    handleClick,
    handleReset
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export { GameContext }
