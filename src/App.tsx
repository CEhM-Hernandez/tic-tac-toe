import { Board } from '@/components/board'
import { Header } from '@/components/header/header'
import { DrawModal } from '@/components/modals/draw-modal'
import { WinnerModal } from '@/components/modals/winner-modal'
import '@/globals.css'

function App() {
  return (
    <div className="flex flex-col h-dvh w-full">
      <WinnerModal />
      <DrawModal />

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
        <Board />
      </main>
    </div>
  )
}

export default App
