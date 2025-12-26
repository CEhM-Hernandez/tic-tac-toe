'use client'

import { Switch } from '@/components/ui/switch'
import { useThemeButton } from '@/hooks/use-theme-button'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'

function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeButton()

  return (
    <span
      title="Cambiar tema"
      className={cn('flex flex-row gap-1 items-center justify-center', className)}
    >
      <Switch
        className="cursor-pointer"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun
          className={cn('size-full p-0.5 z-20 transition-all', {
            'opacity-0 absolute rotate-180': theme === 'dark'
          })}
        />
        <Moon
          className={cn('size-full p-px z-20 transition-all', {
            'opacity-0 absolute -rotate-180': theme === 'light'
          })}
        />
      </Switch>
    </span>
  )
}

export { ThemeButton }
