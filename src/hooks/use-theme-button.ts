'use client'

import type { Theme } from '@/types/theme'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/local-storage'
import * as React from 'react'

const changeTheme = (value: Theme) => {
  if (value === 'dark') {
    document.documentElement.classList.add('dark')
    return
  }
  document.documentElement.classList.remove('dark')
}

export function useThemeButton() {
  const themeFromStorage = getLocalStorageItem('theme') as Theme | null

  const [theme, setTheme] = React.useState<Theme>(themeFromStorage || 'dark')

  React.useEffect(() => {
    changeTheme(theme)
    setLocalStorageItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}
