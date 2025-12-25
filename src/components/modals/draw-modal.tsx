import { useGame } from '@/hooks/use-game'
import { GameModal } from './game-modal'

export function DrawModal() {
  const { isDraw, handleReset } = useGame()

  return (
    <GameModal
      open={isDraw}
      onOpenChange={(open) => !open && handleReset()}
      title="¡Ha sido un empate!"
      description="Ningún jugador ha conseguido ganar esta partida."
    />
  )
}
