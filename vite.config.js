import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vue-router': 'vue-router/dist/vue-router.esm-bundler.js',
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
