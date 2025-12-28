import { AppContext } from '@/context/app-context'
import { socket } from '@/lib/web-socket/connection'
import type { AppContextValue, AppView, GameMode } from '@/types/app'
import type { Player } from '@/types/game'
import * as React from 'react'

function generateRoomCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

function AppProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = React.useState<AppView>('menu')
  const [gameMode, setGameMode] = React.useState<GameMode | null>(null)
  const [roomCode, setRoomCode] = React.useState<string | null>(null)
  const [isHost, setIsHost] = React.useState(false)
  const [playerSymbol, setPlayerSymbol] = React.useState<Player | null>(null)

  const goToMenu = React.useCallback(() => {
    if (socket.connected) {
      socket.disconnect()
    }
    setView('menu')
    setGameMode(null)
    setRoomCode(null)
    setIsHost(false)
    setPlayerSymbol(null)
  }, [])

  const startLocalGame = React.useCallback(() => {
    setGameMode('local')
    setView('local-game')
  }, [])

  const goToOnlineLobby = React.useCallback(() => {
    setGameMode('online')
    setView('online-lobby')
    setRoomCode(null)
    setPlayerSymbol(null)
    setIsHost(false)
    // Conectar al servidor de socket
    if (!socket.connected) {
      socket.connect()
    }
  }, [])

  const createRoom = React.useCallback(() => {
    const code = generateRoomCode()
    setRoomCode(code)
    setIsHost(true)
    setPlayerSymbol('X') // El host siempre es X
    socket.emit('createRoom', code)
  }, [])

  const joinRoom = React.useCallback((code: string) => {
    setRoomCode(code.toUpperCase())
    setIsHost(false)
    setPlayerSymbol('O') // El que se une siempre es O
    socket.emit('joinRoom', code.toUpperCase())
  }, [])

  const leaveRoom = React.useCallback(() => {
    if (roomCode) {
      socket.emit('leaveRoom', roomCode)
    }
    setRoomCode(null)
    setIsHost(false)
    setPlayerSymbol(null)
    setView('online-lobby')
  }, [roomCode])

  // Escuchar eventos del socket
  React.useEffect(() => {
    const handleRoomJoined = (data: { roomCode: string; players: number; symbol: Player }) => {
      console.log('Room joined:', data)
      if (data.symbol) {
        setPlayerSymbol(data.symbol)
      }
      if (data.players === 2) {
        setView('online-game')
      }
    }

    const handlePlayerJoined = () => {
      setView('online-game')
    }

    const handleRoomError = (error: string) => {
      console.error('Room error:', error)
      alert(error)
    }

    const handlePlayerLeft = () => {
      alert('El otro jugador ha abandonado la partida')
      setView('online-lobby')
      setRoomCode(null)
      setIsHost(false)
      setPlayerSymbol(null)
    }

    socket.on('roomJoined', handleRoomJoined)
    socket.on('playerJoined', handlePlayerJoined)
    socket.on('roomError', handleRoomError)
    socket.on('playerLeft', handlePlayerLeft)

    return () => {
      socket.off('roomJoined', handleRoomJoined)
      socket.off('playerJoined', handlePlayerJoined)
      socket.off('roomError', handleRoomError)
      socket.off('playerLeft', handlePlayerLeft)
    }
  }, [])

  const value: AppContextValue = {
    view,
    gameMode,
    roomCode,
    isHost,
    playerSymbol,
    goToMenu,
    startLocalGame,
    goToOnlineLobby,
    createRoom,
    joinRoom,
    setRoomCode,
    leaveRoom
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppProvider }
