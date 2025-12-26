import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useGame } from '@/hooks/use-game'
import { Circle, RefreshCw, X } from 'lucide-react'
import { ThemeButton } from './theme-button'

export function Header() {
  const { currentPlayer, handleReset } = useGame()

  return (
    <header className="w-full shadow-lg">
      <div className="flex items-center justify-between gap-4 py-4 px-2 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">#</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold leading-tight">Tres en raya</h1>
            <p className="text-xs text-muted-foreground">Clásico juego de mesa</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Turno de</span>
          <Badge
            variant={currentPlayer === 'X' ? 'default' : 'secondary'}
            className="font-bold rounded-full size-8"
          >
            {currentPlayer === 'X' ? <X className="size-30!" /> : <Circle className="size-30!" />}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="size-9 cursor-pointer"
            title="Reiniciar partida"
          >
            <RefreshCw className="size-4" />
            <span className="sr-only">Reiniciar</span>
          </Button>
        </div>
        <ThemeButton />
      </div>
      <Separator className="w-full" />
    </header>
  )
}
