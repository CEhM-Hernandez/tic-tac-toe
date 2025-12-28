import type { AppContextValue } from '@/types/app'
import * as React from 'react'

const AppContext = React.createContext<AppContextValue | null>(null)

export { AppContext }
