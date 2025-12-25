import { GameHistory } from '@/context/game-history'
import * as React from 'react'

export function useGameHistory() {
  const context = React.useContext(GameHistory)
  if (!context) {
    throw new Error('useGameHistory must be used within a GameHistoryProvider')
  }
  return context
}
