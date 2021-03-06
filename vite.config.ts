/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { configDefaults } from 'vitest/config'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  test: {
    exclude: [
      ...configDefaults.exclude,
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
    environment: 'jsdom',
  },
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [NaiveUiResolver()],
      dirs: ['src/components', 'src/views'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 7650,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7780',
        changeOrigin: true,
      },
    },
  },
})
