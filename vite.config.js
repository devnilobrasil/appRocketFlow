import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/appRocketFlow/dist/', // ajuste este caminho conforme necessário
  plugins: [react()],
})
