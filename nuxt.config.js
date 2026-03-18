import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Совершенство — ваша стоматология',
    },
  },
  htmlAttrs: {
    lang: 'ru',
  },
  css: [resolve('./assets/css/main.css')],

  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/icon', '@nuxt/image', '@nuxt/fonts'],

  nitro: {
    preset: 'vercel',
  },

  image: {
    quality: 80,
    format: ['webp'],
    densities: [1],
  },

  colorMode: {
    preference: 'light',
    fallback: 'light',
    dataValue: 'light',
  },

  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [200, 300, 400, 500, 600, 700],
        subsets: ['latin', 'cyrillic'],
        display: 'swap',
      },
    ],
  },
})
