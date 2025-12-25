import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/use-game'
import { cn } from '@/lib/utils'
import { Circle, X } from 'lucide-react'

export function Board() {
  const { board, errorCell, handleClick } = useGame()

  return (
    <section className="grid grid-cols-3 grid-rows-3 gap-4 aspect-square w-full max-w-lg">
      {board.map((value, index) => (
        <Button
          onClick={() => handleClick(index)}
          key={index}
          className={cn(
            'size-full text-4xl font-bold flex items-center justify-center cursor-pointer transition-colors duration-200 rounded-md aspect-square',
            { 'bg-destructive animate-shake': errorCell === index }
          )}
        >
          {value === null ? (
            value
          ) : value === 'X' ? (
            <X className="size-30" />
          ) : (
            <Circle className="size-30" />
          )}
        </Button>
      ))}
    </section>
  )
}
