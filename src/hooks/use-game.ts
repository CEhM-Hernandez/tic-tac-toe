import * as React from 'react'
import { GameContext } from '@/context/game-context'

export function useGame() {
  const context = React.useContext(GameContext)

  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }

  return context
}
