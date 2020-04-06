<template>
  <v-app id="page-t">
    <div class="panel_bg"></div>
    <v-toolbar class="hidden-sm-and-down" color="transparent" style="right: 0" absolute flat>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="white--text mx-2 secondary"
        active-class="tertiary"
        rounded
        small
      >
        <span class="font-regular text-capitalize">{{item.title}}</span>
      </v-btn>
    </v-toolbar>
    <v-app-bar class="hidden-md-and-up" color="white" dense flat fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content :class="$vuetify.breakpoint.smAndDown ? 'mt-12' : ''">
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
      script: [
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
        }
      ],
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
    ]
  })
};
</script>

<style>
.bgcolor {
  background-color: #f2f2f2;
  font-family: "Monda", sans-serif;
}

#app .v-bottom-navigation .v-btn {
  height: inherit !important;
}

.zoom {
  transition: transform 0.2s;
}
.zoom:hover {
  transform: scale(1.1);
}
.panel_bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;

  background: #ececec;
  transform: skewY(-5deg);
  transform-origin: top left;
}
</style>
