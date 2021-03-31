import colors from "vuetify/es5/util/colors";

export default {
  env: {
    sheetsAPIKey: process.env.sheetsAPIKey,
    sheetID: process.env.sheetID,
    USPMULTI: process.env.USPMULTI,
  },
  ssr: true,
  target: "server",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "Hub USP Inovação",
    title: "Hub USP Inovação",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      { name: "msapplication-TileColor", content: "#da532c" },
      { name: "theme-color", content: "#ffffff" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
      },
      { rel: "manifest", href: "/favicon/site.webmanifest" },
      {
        rel: "mask-icon",
        href: "/favicon/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/breakpoint.js" },
    { src: "~/plugins/vue-fuse.js", mode: "client" },
    { src: "~/plugins/vue-typer.js", mode: "client" },
    { src: "~/plugins/campi.js" },
    { src: "~/plugins/knowledge_areas.js" },
    { src: "~/plugins/cnae.js" },
    { src: "~/plugins/company.js" },
    { src: "~/plugins/fuzzySearch.js" },
    { src: "~/plugins/services/fetch_companies.js" },
    { src: "~/plugins/services/fetch_disciplines.js" },
    { src: "~/plugins/services/fetch_iniciatives.js" },
    { src: "~/plugins/services/fetch_patents.js" },
    { src: "~/plugins/services/fetch_pdis.js" },
    { src: "~/plugins/services/fetch_skills.js" },
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/google-analytics"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: "#ffb163",
          secondary: "#4AD4FF",
          tertiary: "#108CB3",
          error: colors.blue.darken1,
          background: "#ececec",
        },
        options: {
          customProperties: true,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {},
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
};
