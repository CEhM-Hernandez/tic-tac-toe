'use client'

import { Switch } from '@/components/ui/switch'
import { useThemeButton } from '@/hooks/use-theme-button'
import { cn } from '@/lib/utils'
import { Moon, SunDim } from 'lucide-react'

function ThemeButton({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeButton()

  return (
    <span
      title="Cambiar tema"
      className={cn('flex flex-row gap-1 items-center justify-center', className)}
    >
      <SunDim className="size-6" />
      <Switch
        className="cursor-pointer"
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <Moon className="size-6" />
    </span>
  )
}

export { ThemeButton }
