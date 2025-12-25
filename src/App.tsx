import { Board } from '@/components/board'
import { GameHistoryPanel } from '@/components/game-history-panel'
import { Header } from '@/components/header/header'
import { DrawModal } from '@/components/modals/draw-modal'
import { WinnerModal } from '@/components/modals/winner-modal'
import '@/globals.css'

function App() {
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

export default App
