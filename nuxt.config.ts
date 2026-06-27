// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  components: [
    { path: '~/components/ui', pathPrefix: false },
    { path: '~/components/layout', pathPrefix: false },
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/three', pathPrefix: false },
  ],

  css: ['~/assets/styles/main.scss'],

  app: {
    head: {
      title: 'Serze — 墨と静けさのポートフォリオ',
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Serze — Designer & Developer. 静寂をデザインする。',
        },
        { name: 'theme-color', content: '#f5f3ee' },
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=document.cookie.match(/(?:^|; )serze_theme=([^;]*)/);var v=t?t[1]:'';if(v==='dark'||v==='light'){document.documentElement.dataset.theme=v}else{var m=window.matchMedia('(prefers-color-scheme: dark)');document.documentElement.dataset.theme=m.matches?'dark':'light'}}catch(e){document.documentElement.dataset.theme='light'}})();`,
          tagPosition: 'head',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
        },
      ],
    },
    pageTransition: { name: 'ink', mode: 'out-in' },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  experimental: {
    payloadExtraction: true,
  },
})
