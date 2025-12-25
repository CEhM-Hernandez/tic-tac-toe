import { GameContext } from '@/context/game-context'
import * as React from 'react'

export function useGame() {
  const context = React.useContext(GameContext)

  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }

  return context
}
