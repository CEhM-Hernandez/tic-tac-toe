import type { Player } from '@/types/game'

type GameMode = 'local' | 'online'
type AppView = 'menu' | 'local-game' | 'online-lobby' | 'online-game'

interface AppState {
  view: AppView
  gameMode: GameMode | null
  roomCode: string | null
  isHost: boolean
  playerSymbol: Player | null
}

interface AppContextValue extends AppState {
  goToMenu: () => void
  startLocalGame: () => void
  goToOnlineLobby: () => void
  createRoom: () => void
  joinRoom: (code: string) => void
  setRoomCode: (code: string | null) => void
  leaveRoom: () => void
}

export type { AppContextValue, AppState, AppView, GameMode }
