import { useGame } from '@/hooks/use-game'
import { ResetButton } from '@/components/reset-button'
import { Board } from '@/components/board'
import { WinnerBanner } from '@/components/modals/winner-modal'
import { DrawModal } from '@/components/modals/draw-modal'
import '@/App.css'

function App() {
  const { currentPlayer, winner } = useGame()

  return (
    <main className="flex flex-col items-center justify-center w-full h-dvh gap-4 p-10 relative">
      {winner && winner !== 'Draw' && <WinnerBanner />}
      {winner === 'Draw' && <DrawModal />}
      <ResetButton className="absolute top-5 right-5" />
      <header className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-5xl font-bold text-center">Tic Tac Toe</h1>
        <h2 className="text-xl font-bold text-yellow-500 decoration-1">
          turno de: {currentPlayer}
        </h2>
      </header>
      <Board />
    </main>
  )
}

export default App
