// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',
  css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/css/main.css'],
  devtools: { enabled: true },
  devServer: {
    port: 3030,
  },

  modules: ['@nuxt/icon'],

  app: {
    baseURL: '/mobility-label-nuxt4/',
    head: {
      htmlAttrs: { lang: 'it' },
      title: 'Mobility Label – Autovalutazione mobilità aziendale | MobilitySquare',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Strumento di autovalutazione per la mobilità sostenibile aziendale. Calcola la Mobility Label della tua azienda secondo lo standard MoMa.Biz: ciclabilità, trasporto pubblico, car pooling, sharing mobility e molto altro.',
        },
        {
          name: 'keywords',
          content: 'mobility label, mobilità aziendale, mobilità sostenibile, autovalutazione, moma.biz, piano spostamento casa lavoro, PSCL, mobilità ciclabile, trasporto pubblico, carpooling, sharing mobility, zone industriali, MobilitySquare',
        },
        { name: 'author', content: 'MobilitySquare – mobilitysquare.eu' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Mobility Label – Autovalutazione mobilità aziendale' },
        {
          property: 'og:description',
          content: 'Calcola la Mobility Label della tua azienda con lo strumento di autovalutazione MoMa.Biz, sviluppato da MobilitySquare.',
        },
        { property: 'og:image', content: '/images/green_label.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/mobility-label-nuxt4/favicon.png' },
      ],
    },
  },
})
