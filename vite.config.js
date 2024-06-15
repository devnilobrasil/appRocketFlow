import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-react-deploy/', // ajuste este caminho conforme necessário
  plugins: [react()],
})
