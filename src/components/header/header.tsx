import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useApp } from '@/hooks/use-app'
import { useGame } from '@/hooks/use-game'
import { ArrowLeft, Circle, LogOut, RefreshCw, X } from 'lucide-react'
import { ThemeButton } from '@/components/header/theme-button'

export function Header() {
  const { currentPlayer, handleReset, isMyTurn } = useGame()
  const { gameMode, playerSymbol, goToMenu, leaveRoom } = useApp()

  const isOnline = gameMode === 'online'

  return (
    <header className="w-full shadow-lg">
      <div className="flex items-center justify-between gap-4 py-4 px-2 max-w-xl mx-auto">
        <div className="flex items-center gap-3">
          {isOnline ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={leaveRoom}
              className="size-10"
              title="Abandonar partida"
            >
              <LogOut className="size-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={goToMenu}
              className="size-10"
              title="Volver al menú"
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold leading-tight">Tres en raya</h1>
            {isOnline && playerSymbol && (
              <p className="text-xs text-muted-foreground">
                Juegas con {playerSymbol === 'X' ? 'X' : 'O'} •{' '}
                {isMyTurn ? (
                  <span className="text-green-500 font-medium">Tu turno</span>
                ) : (
                  <span className="text-yellow-500">Esperando...</span>
                )}
              </p>
            )}
            {!isOnline && <p className="text-xs text-muted-foreground">Partida local</p>}
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
