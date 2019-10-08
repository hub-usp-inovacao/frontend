<template>
  <v-app>
    <v-toolbar class="hidden-sm-and-down" flat>
      <!-- <v-toolbar-title>{{title}}</v-toolbar-title> -->
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-for="(item, i) in items" :key="i" :to="item.to" text router>{{item.title}}</v-btn>
      </v-toolbar-items>
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

    <v-content class="bgcolor mb-12">
      <!-- <v-container fluid> -->
      <nuxt class="mb-12" />
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
export default {
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
          href:
            "https://fonts.googleapis.com/css?family=Merriweather:300&display=swap"
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
}

#app .v-bottom-navigation .v-btn {
  height: inherit !important;
}
</style>
