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
  isDraw: boolean
  handleClick: (index: number) => void
  handleReset: () => void
}

type History = Winner[]

interface GameHistoryContextValue {
  history: History
  addToHistory: (winner: Winner) => void
  clearHistory: () => void
}

export type { Cell, GameContextValue, GameHistoryContextValue, GameState, History, Player, Winner }
