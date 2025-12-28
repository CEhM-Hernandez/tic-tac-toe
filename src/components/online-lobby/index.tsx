import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useApp } from '@/hooks/use-app'
import { socket } from '@/lib/web-socket/connection'
import { ArrowLeft, Copy, Loader2, Users } from 'lucide-react'
import * as React from 'react'

function OnlineLobby() {
  const { roomCode, isHost, createRoom, joinRoom, goToMenu } = useApp()
  const [inputCode, setInputCode] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const [isConnecting, setIsConnecting] = React.useState(true)

  React.useEffect(() => {
    const handleConnect = () => {
      setIsConnecting(false)
    }

    if (socket.connected) {
      setIsConnecting(false)
    } else {
      socket.on('connect', handleConnect)
    }

    return () => {
      socket.off('connect', handleConnect)
    }
  }, [])

  const handleCopyCode = async () => {
    if (roomCode) {
      await navigator.clipboard.writeText(roomCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputCode.trim().length >= 4) {
      joinRoom(inputCode.trim())
    }
  }

  if (isConnecting) {
    return (
      <main className="grid place-content-center h-dvh w-full overflow-hidden">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Conectando al servidor...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="grid place-content-center h-dvh w-full overflow-hidden p-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <Button variant="ghost" className="self-start" onClick={goToMenu}>
          <ArrowLeft className="size-4 mr-2" />
          Volver al menú
        </Button>

        <h1 className="text-2xl font-bold">Partida Online</h1>

        {/* Crear partida */}
        <Card className="w-full p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="size-5" />
            Crear partida
          </h2>

          {!roomCode ? (
            <Button onClick={createRoom} className="w-full">
              Crear nueva partida
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Comparte este código con tu oponente:</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-secondary/50 rounded-lg px-4 py-3 text-center font-mono text-2xl font-bold tracking-widest">
                  {roomCode}
                </div>
                <Button variant="outline" size="icon" onClick={handleCopyCode}>
                  <Copy className="size-4" />
                </Button>
              </div>
              {copied && <p className="text-sm text-green-500 text-center">¡Código copiado!</p>}
              {isHost && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Esperando a que se una un jugador...
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Unirse a partida */}
        <Card className="w-full p-6">
          <h2 className="text-lg font-semibold mb-4">Unirse a partida</h2>
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div>
              <label htmlFor="roomCode" className="text-sm text-muted-foreground mb-2 block">
                Ingresa el código de la partida:
              </label>
              <input
                id="roomCode"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="Ej: ABC123"
                maxLength={6}
                className="w-full bg-secondary/50 rounded-lg px-4 py-3 text-center font-mono text-xl uppercase tracking-widest placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              disabled={inputCode.trim().length < 4}
            >
              Unirse a partida
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}

export { OnlineLobby }
