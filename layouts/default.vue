<template>
  <v-app>
    <v-content>
      <v-toolbar class="hidden-sm-and-down" color="transparent" style="right: 0" absolute flat>
        <v-spacer />
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="white--text mx-2"
          color="light-blue darken-1"
          active-class
          depressed
          rounded
          small
        >{{item.title}}</v-btn>
      </v-toolbar>

      <v-bottom-navigation class="hidden-md-and-up" fixed grow shift>
        <v-btn to="/iniciativas">
          <span>Iniciativas</span>
          <v-icon>mdi-account-group</v-icon>
        </v-btn>

        <v-btn to="/desenvolvimento-e-inovacao">
          <span>D&I</span>
          <v-icon>mdi-lightbulb-on</v-icon>
        </v-btn>

        <v-btn to="/educacao">
          <span>Educação</span>
          <v-icon>mdi-book-open-page-variant</v-icon>
        </v-btn>

        <v-btn to="/empresas">
          <span>Empresas</span>
          <v-icon>mdi-office-building</v-icon>
        </v-btn>
      </v-bottom-navigation>

      <!-- <v-container fluid> -->
      <nuxt />
      <!-- </v-container> -->
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
        title: "Iniciativas",
        to: "/iniciativas"
      },
      {
        title: "D&I",
        to: "/desenvolvimento-e-inovacao"
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
</style>
