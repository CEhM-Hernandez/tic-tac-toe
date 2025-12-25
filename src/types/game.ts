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

export type { Player, Cell, Winner, GameState, GameContextValue }
