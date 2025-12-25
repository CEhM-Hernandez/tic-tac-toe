import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { ResetButton } from '@/components/reset-button'

interface GameModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
}

export function GameModal({ open, onOpenChange, title, description }: GameModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <DialogTitle className="text-2xl sm:text-3xl font-bold">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-base">{description}</DialogDescription>
          )}
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <ResetButton />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
