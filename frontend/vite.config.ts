import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Função para carregar as variáveis do .env
const loadEnvironment = () => loadEnv('development', process.cwd(), '')

const getPort = () => {
  const env = loadEnvironment()
  const port = env.VITE_APP_PORT
  const parsedPort = Number(port)
  return Number.isNaN(parsedPort) ? 5173 : parsedPort
}

const getApiUrl = () => {
  const env = loadEnvironment()
  return env.VITE_API_URL
}

export default defineConfig({
  plugins: [react()],
  server: {
    port: getPort(),
    proxy: {
      '/api': {
        target: getApiUrl(),
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
