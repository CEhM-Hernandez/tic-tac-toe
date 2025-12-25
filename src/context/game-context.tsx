import type { GameContextValue } from '@/types/game'
import * as React from 'react'

const GameContext = React.createContext<GameContextValue | null>(null)

export { GameContext }
