import { AppContext } from '@/context/app-context'
import * as React from 'react'

export function useApp() {
  const context = React.useContext(AppContext)

  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}
