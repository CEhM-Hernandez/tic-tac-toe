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
  isMyTurn: boolean
  handleClick: (index: number) => void
  handleReset: () => void
}

type History = Winner[]

interface GameHistoryContextValue {
  history: History
  addToHistory: (winner: Winner) => void
  clearHistory: () => void
}

// Tipos para eventos de socket
interface GameMoveData {
  roomCode: string
  index: number
  player: Player
}

interface GameStateData {
  board: Cell[]
  currentPlayer: Player
  winner: Winner
}

export type {
  Cell,
  GameContextValue,
  GameHistoryContextValue,
  GameMoveData,
  GameState,
  GameStateData,
  History,
  Player,
  Winner
}
