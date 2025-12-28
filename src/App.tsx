import { Board } from '@/components/board'
import { GameHistoryPanel } from '@/components/game-history-panel'
import { Header } from '@/components/header/header'
import { DrawModal } from '@/components/modals/draw-modal'
import { WinnerModal } from '@/components/modals/winner-modal'
import { MainMenu } from '@/components/menu'
import { OnlineLobby } from '@/components/online-lobby'
import { GameProvider } from '@/components/providers/game-provider'
import { OnlineGameProvider } from '@/components/providers/online-game-provider'
import { useApp } from '@/hooks/use-app'
import '@/globals.css'

function GameView() {
  return (
    <div className="flex flex-col min-h-dvh w-full overflow-x-hidden">
      <WinnerModal />
      <DrawModal />

      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
        <Board />
        <GameHistoryPanel />
      </main>
    </div>
  )
}

function LocalGame() {
  return (
    <GameProvider>
      <GameView />
    </GameProvider>
  )
}

function OnlineGame() {
  return (
    <OnlineGameProvider>
      <GameView />
    </OnlineGameProvider>
  )
}

function App() {
  const { view } = useApp()

  switch (view) {
    case 'menu':
      return <MainMenu />
    case 'local-game':
      return <LocalGame />
    case 'online-lobby':
      return <OnlineLobby />
    case 'online-game':
      return <OnlineGame />
    default:
      return <MainMenu />
  }
}

export default App
