<template>
  <v-app>
    <v-toolbar color="transparent" flat>
      <!-- <v-toolbar-title>{{title}}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          class="primary--text"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          text
          router
        >{{item.title}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content class="test">
      <!-- <v-container fluid> -->
      <nuxt />
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
.test {
  background-color: #f2f2f2;
}

.invisible {
  top: 0;
  opacity: 1;
  padding: 0;
  margin: 0;
  left: 0;
}
</style>
