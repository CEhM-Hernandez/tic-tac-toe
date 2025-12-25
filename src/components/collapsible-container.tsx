import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CollapsibleContext } from '@/hooks/use-collapsible'
import { useGameHistory } from '@/hooks/use-game-history'
import { cn } from '@/lib/utils'
import { ChevronRight, History } from 'lucide-react'
import * as React from 'react'

interface CollapsibleContainerProps {
  children: React.ReactNode
  direction: 'horizontal' | 'vertical'
  className?: string
}

function CollapsibleContainer({ children, direction, className }: CollapsibleContainerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const { history } = useGameHistory()

  const contentClasses = cn(
    'overflow-hidden',
    direction === 'horizontal' &&
      'data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right',
    direction === 'vertical' &&
      'data-[state=open]:animate-slide-in-up data-[state=closed]:animate-slide-out-down'
  )

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen }}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        {!isOpen && (
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              title="Ver historial de partidas"
              className={cn(
                'cursor-pointer shadow-md transition-all duration-200 group',
                direction === 'horizontal' && 'absolute right-4 top-1/2 -translate-y-1/2',
                direction === 'vertical' && 'relative z-20'
              )}
            >
              <span className="flex items-center gap-2">
                <History className="size-4" />
                <span className="text-sm">Historial</span>
                {history.length > 0 && (
                  <Badge variant="default" className="size-5 p-0 text-xs rounded-full">
                    {history.length > 99 ? '99+' : history.length}
                  </Badge>
                )}
                <ChevronRight
                  className={cn(
                    'size-4 transition-transform group-hover:translate-x-0.5',
                    direction === 'vertical' &&
                      '-rotate-90 group-hover:translate-x-0 group-hover:-translate-y-0.5'
                  )}
                />
              </span>
            </Button>
          </CollapsibleTrigger>
        )}
        <CollapsibleContent className={contentClasses}>{children}</CollapsibleContent>
      </Collapsible>
    </CollapsibleContext.Provider>
  )
}

export { CollapsibleContainer }
