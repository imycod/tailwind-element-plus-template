
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { analyzer } from 'vite-bundle-analyzer'
import baseConfig from "./vite.base.config"

export default defineConfig({
  ...baseConfig,
  plugins: [
    vue(),
    analyzer()
  ]
})
