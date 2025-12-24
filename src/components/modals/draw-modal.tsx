import { useGame } from '@/hooks/use-game'
import { ResetButton } from '@/components/reset-button'

export function DrawModal() {
  const { handleReset } = useGame()

  return (
    <div
      className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 z-20"
      onClick={handleReset}
    >
      <div
        className="flex flex-col bg-gray-600 p-10 rounded-md gap-4 items-center justify-center z-30 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="flex items-center justify-center absolute top-2 right-2 text-white cursor-pointer bg-red-500 rounded-md size-6 text-sm font-bold pb-0.5"
          onClick={handleReset}
        >
          x
        </span>
        <h2 className="text-4xl font-bold text-white">¡Ha sido un empate!</h2>
        <ResetButton className="text-lg" />
      </div>
    </div>
  )
}
