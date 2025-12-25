import type { GameHistoryContextValue } from '@/types/game'
import * as React from 'react'

const GameHistory = React.createContext<GameHistoryContextValue | null>(null)

export { GameHistory }
