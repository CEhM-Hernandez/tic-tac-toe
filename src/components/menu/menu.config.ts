type MenuOptionKey = 'local' | 'online' | 'help'

interface MenuOption {
  key: MenuOptionKey
  label: string
}

const MENU_CONFIG = {
  title: 'Tres en raya',
  description: 'Clásico juego de mesa',
  options: [
    { key: 'local', label: 'Partida Local' },
    { key: 'online', label: 'Partida Online' },
    { key: 'help', label: 'Ayuda' }
  ] as MenuOption[]
}

export { MENU_CONFIG }
export type { MenuOption, MenuOptionKey }
