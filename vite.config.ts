import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import getCssModulesNamesGenerator from './utils/css-modules-names-generator';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[hash][extname]',
        chunkFileNames: 'chunks/[hash].js',
        entryFileNames: 'entries/[hash].js',
      },
    },
  },
  css: {
    modules: {
      generateScopedName: getCssModulesNamesGenerator(process.env.NODE_ENV === 'production'),
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/styles/global.scss" as *;',
      },
    },
  },
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
