<template>
  <v-app>
    <v-toolbar
      class="hidden-sm-and-down d-flex justify-end"
      color="transparent"
      width="75%"
      style="margin-left: 25%;"
      absolute
      flat
    >
      <v-toolbar-items>
        <v-chip-group>
          <v-chip
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            class="white--text mx-2 secondary py-4 px-6 subtitle-1"
          >{{ item.title }}</v-chip>
        </v-chip-group>
      </v-toolbar-items>
    </v-toolbar>

    <v-app-bar class="hidden-md-and-up" color="white" dense flat fixed>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : ''">
      <v-snackbar :value="true" :timeout="0">
        <span class="text-center">Página de uso exclusivamente interno</span>
      </v-snackbar>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../components/Footer.vue";

export default {
  components: {
    Footer
  },
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Monda&display=swap"
        }
      ]
    };
  },
  data: () => ({
    activeItem: 0,
    items: [
      {
        title: "Home",
        to: "/"
      },
      {
        title: "Iniciativas",
        to: "/iniciativas"
      },
      {
        title: "P&D&I",
        to: "/inovacao"
      },
      {
        title: "Competências",
        to: "/competencias"
      },
      {
        title: "Educação",
        to: "/educacao"
      },
      {
        title: "Empresas",
        to: "/empresas"
      },
      {
        title: "Patentes",
        to: "/patentes"
      },
      {
        title: "Contato",
        to: "/contato"
      }
    ],
    drawer: false,
    group: ""
  })
};
</script>

<style>
#app .v-bottom-navigation .v-btn {
  height: inherit !important;
}
.zoom {
  transition: transform 0.2s;
}
.zoom:hover {
  transform: scale(1.1);
}
</style>
