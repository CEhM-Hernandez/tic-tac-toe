import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const socketIOProxyTarget = env.VITE_SOCKET_URL

  if (!socketIOProxyTarget) {
    throw new Error('VITE_SOCKET_URL environment variable is required')
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        '/socket.io': {
          target: socketIOProxyTarget,
          ws: true
        }
      }
    }
  }
})
