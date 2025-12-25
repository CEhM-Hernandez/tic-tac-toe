import { useGame } from '@/hooks/use-game'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ResetButtonProps = {
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function ResetButton({ className, ...props }: ResetButtonProps) {
  const { handleReset, board } = useGame()

  return (
    <Button
      onClick={handleReset}
      variant="destructive"
      className={cn('cursor-pointer bg-destructive', className)}
      disabled={board.every((cell) => cell === null)}
      {...props}
    >
      Reiniciar Juego
    </Button>
  )
}
