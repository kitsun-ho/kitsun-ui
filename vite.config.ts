/// <reference types="vitest" />

import type { UserConfig } from 'vite';
import { resolve } from 'node:path';
import vue from '@vitejs/plugin-vue';
import postcssNested from 'postcss-nested';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';

const randomVersion = Date.now().toString(); // 可改為 crypto.randomUUID()

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    base: mode === 'production' ? '/kitsun-ui/' : './',
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
          'vitest',
          // custom
          {
            'lodash-es': [
              'debounce',
              'cloneDeep',
            ],
            'uuid': [
              ['v4', 'uuid'],
            ],
          },
        ],
        resolvers: [],
        eslintrc: {
          enabled: true,
        },
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/views'],
        directoryAsNamespace: true,
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
      }),
      UnoCSS(),
      compression({
        threshold: 100000,
        algorithm: 'brotliCompress',
      }),
    ],
    css: {
      postcss: {
        plugins: [postcssNested],
      },
      devSourcemap: mode !== 'production',
    },
    resolve: {
      alias: {
        '@': `${resolve(__dirname, './src')}/`,
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name]-${randomVersion}.js`, // 讓 entry 檔案名稱帶上隨機碼
          chunkFileNames: `assets/[name]-${randomVersion}.js`, // 讓 chunk 檔案名稱帶上隨機碼
          assetFileNames: `assets/[name]-${randomVersion}[extname]`, // 讓靜態資源也帶上隨機碼
        },
      },
    },
  };

  return config;
});
