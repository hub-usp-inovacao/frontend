import colors from "vuetify/es5/util/colors";
import get_data from "./hooks";

export default {
  env: {
    sheetsAPIKey: process.env.sheetsAPIKey,
    sheetID: process.env.sheetID,
  },
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
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
    { src: "~/plugins/vue-masonry.js", mode: "client" },
    { src: "~/plugins/vue-typer.js", mode: "client" },
    { src: "~/plugins/campi.js" },
    { src: "~/plugins/knowledge_areas.js" },
    { src: "~/plugins/services/fetch_skills.js" },
    { src: "~/plugins/services/fetch_disciplines.js" },
    { src: "~/plugins/services/fetch_companies.js" },
    { src: "~/plugins/services/fetch_patents.js" },
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
  hooks: {
    generate: {
      // eslint-disable-next-line no-unused-vars
      before(nuxt, generateOptions) {
        get_data();
      },
    },
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },
};
