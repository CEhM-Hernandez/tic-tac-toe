import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { GameProvider } from '@/components/providers/game-provider.tsx'
import { GameHistoryProvider } from '@/components/providers/game-history-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameHistoryProvider>
      <GameProvider>
        <App />
      </GameProvider>
    </GameHistoryProvider>
  </StrictMode>
)
