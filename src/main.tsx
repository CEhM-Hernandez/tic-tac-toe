import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import { AppProvider } from '@/components/providers/app-provider'
import { GameHistoryProvider } from '@/components/providers/game-history-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <GameHistoryProvider>
        <App />
      </GameHistoryProvider>
    </AppProvider>
  </StrictMode>
)
