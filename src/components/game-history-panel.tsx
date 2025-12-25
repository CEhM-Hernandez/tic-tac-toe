import { CollapsibleContainer } from '@/components/collapsible-container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCollapsible } from '@/hooks/use-collapsible'
import { useGameHistory } from '@/hooks/use-game-history'
import { Trash2, X } from 'lucide-react'

function GameHistoryContent() {
  const { history, clearHistory } = useGameHistory()
  const { setIsOpen } = useCollapsible()

  const stats = {
    xWins: history.filter((w) => w === 'X').length,
    oWins: history.filter((w) => w === 'O').length,
    draws: history.filter((w) => w === 'Draw').length
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Historial</CardTitle>
          <div className="flex items-center gap-1">
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                title="Limpiar historial"
                className="size-8 text-muted-foreground hover:text-destructive cursor-pointer"
              >
                <Trash2 className="size-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              title="Cerrar historial"
              className="size-8 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          {history.length} {history.length === 1 ? 'partida' : 'partidas'} jugadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Estadísticas */}
        <div className="flex justify-between gap-2 text-sm">
          <div className="flex flex-col items-center gap-1 flex-1 rounded-md bg-muted p-2">
            <span className="font-bold text-lg">{stats.xWins}</span>
            <span className="text-muted-foreground text-xs">X gana</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 rounded-md bg-muted p-2">
            <span className="font-bold text-lg">{stats.draws}</span>
            <span className="text-muted-foreground text-xs">Empates</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 rounded-md bg-muted p-2">
            <span className="font-bold text-lg">{stats.oWins}</span>
            <span className="text-muted-foreground text-xs">O gana</span>
          </div>
        </div>

        {/* Lista de partidas */}
        {history.length > 0 ? (
          <ScrollArea className="h-40">
            <div className="space-y-2 pr-4">
              {[...history].reverse().map((result, index) => (
                <div
                  key={history.length - 1 - index}
                  className="flex items-center justify-between rounded-md border p-2 text-sm"
                >
                  <span className="text-muted-foreground">Partida {history.length - index}</span>
                  <Badge
                    variant={
                      result === 'Draw' ? 'secondary' : result === 'X' ? 'default' : 'outline'
                    }
                  >
                    {result === 'Draw' ? 'Empate' : `Ganador: ${result}`}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            No hay partidas registradas
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function DesktopGameHistory() {
  return (
    <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-10">
      <CollapsibleContainer direction="horizontal">
        <div className="w-72 pr-4">
          <GameHistoryContent />
        </div>
      </CollapsibleContainer>
    </div>
  )
}

function MobileGameHistory() {
  return (
    <div className="lg:hidden fixed bottom-4 right-4 z-10">
      <CollapsibleContainer direction="vertical">
        <div className="w-72 mb-14">
          <GameHistoryContent />
        </div>
      </CollapsibleContainer>
    </div>
  )
}

export function GameHistoryPanel() {
  return (
    <>
      <DesktopGameHistory />
      <MobileGameHistory />
    </>
  )
}
