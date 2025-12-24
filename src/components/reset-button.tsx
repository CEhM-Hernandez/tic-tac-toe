import { useGame } from '@/hooks/use-game'

type ResetButtonProps = {
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function ResetButton({ className, ...props }: ResetButtonProps) {
  const { handleReset, board } = useGame()

  return (
    <button
      onClick={handleReset}
      className={`px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer ${
        className ?? ''
      }`}
      disabled={board.every((cell) => cell === null)}
      {...props}
    >
      Reiniciar Juego
    </button>
  )
}
