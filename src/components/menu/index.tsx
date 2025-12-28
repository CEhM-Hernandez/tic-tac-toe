import { MENU_CONFIG, type MenuOptionKey } from '@/components/menu/menu.config'
import { useApp } from '@/hooks/use-app'
import { Monitor, Wifi, HelpCircle } from 'lucide-react'

const icons: Record<MenuOptionKey, React.ReactNode> = {
  local: <Monitor className="size-5" />,
  online: <Wifi className="size-5" />,
  help: <HelpCircle className="size-5" />
}

function MainMenu() {
  const { startLocalGame, goToOnlineLobby } = useApp()

  const handleOptionClick = (key: MenuOptionKey) => {
    switch (key) {
      case 'local':
        startLocalGame()
        break
      case 'online':
        goToOnlineLobby()
        break
      case 'help':
        // TODO: Implementar modal de ayuda
        break
    }
  }

  return (
    <main className="grid place-content-center h-dvh w-full overflow-hidden">
      <div className="flex flex-col items-center gap-6 p-4">
        <h1 className="text-3xl font-bold">{MENU_CONFIG.title}</h1>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {MENU_CONFIG.description}
        </p>
        <ul className="flex flex-col gap-3 w-full max-w-xs">
          {MENU_CONFIG.options.map((option) => (
            <MenuItem
              key={option.key}
              label={option.label}
              icon={icons[option.key]}
              onClick={() => handleOptionClick(option.key)}
            />
          ))}
        </ul>
      </div>
    </main>
  )
}

interface MenuItemProps {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
}

function MenuItem({ label, icon, onClick }: MenuItemProps) {
  return (
    <li
      className="flex items-center gap-3 p-4 bg-secondary/10 rounded-lg hover:bg-secondary/20 cursor-pointer transition"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </li>
  )
}

export { MainMenu }
