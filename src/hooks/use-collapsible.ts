import * as React from 'react'

const CollapsibleContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

function useCollapsible() {
  const context = React.useContext(CollapsibleContext)
  if (!context) {
    throw new Error('useCollapsible must be used within a CollapsibleContainer')
  }
  return context
}

export { CollapsibleContext, useCollapsible }
