import { useGame } from '@/hooks/use-game'
import { GameModal } from './game-modal'

export function WinnerModal() {
  const { winner, handleReset } = useGame()

  const isWinner = !!winner && winner !== 'Draw'

  return (
    <GameModal
      open={isWinner}
      onOpenChange={(open) => !open && handleReset()}
      title={`¡El ganador es: ${winner}!`}
      description="¡Felicidades al ganador! ¿Quieres jugar otra partida?"
    />
  )
}
