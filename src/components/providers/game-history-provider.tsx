import { GameHistory } from '@/context/game-history'
import type { GameHistoryContextValue, History, Winner } from '@/types/game'
import * as React from 'react'

export function GameHistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = React.useState<History>(() => {
    const storedHistory = localStorage.getItem('gameHistory')
    return storedHistory ? JSON.parse(storedHistory) : []
  })

  React.useEffect(() => {
    localStorage.setItem('gameHistory', JSON.stringify(history))
  }, [history])

  const addToHistory = React.useCallback((winner: Winner) => {
    if (winner) {
      setHistory((prev) => [...prev, winner])
    }
  }, [])

  const clearHistory = React.useCallback(() => {
    setHistory([])
  }, [])

  const value: GameHistoryContextValue = {
    history,
    addToHistory,
    clearHistory
  }

  return <GameHistory.Provider value={value}>{children}</GameHistory.Provider>
}
