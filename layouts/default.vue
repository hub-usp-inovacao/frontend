<template>
  <v-app>
    <div class="panel_bg"></div>
    <v-toolbar class="hidden-sm-and-down" color="transparent" style="right: 0" absolute flat>
      <v-btn
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        class="white--text mx-2 text-capitalize"
        color="#039BE5"
        active-class
        depressed
        rounded
        small
      >{{item.title}}</v-btn>
    </v-toolbar>
    <v-app-bar class="hidden-md-and-up" color="white" dense flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>

    <v-content>
      <!-- <v-bottom-navigation class="hidden-md-and-up" fixed grow shift>
        <v-btn v-for="item in items" :key="item.title" :to="item.to">
          <span>{{item.title}}</span>
          <v-icon>mdi-book-open-page-variant</v-icon>
        </v-btn>
      </v-bottom-navigation>-->

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
    title: "SOLUS",
    items: [
      {
        title: "Home",
        to: "/"
      },
      {
        title: "Competências",
        to: "/competencias"
      },
      {
        title: "Iniciativas",
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
  height: 40rem;

  background: #ffa726;
  transform: skewY(-5deg);
  transform-origin: top left;
}
</style>
