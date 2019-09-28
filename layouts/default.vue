<template>
  <v-app>
    <v-toolbar flat>
      <!-- <v-toolbar-title>{{title}}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          class="primary--text all"
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
          href: "https://fonts.googleapis.com/css?family=Cardo:400,700|Oswald"
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
.all {
  font-family: "Verdana", sans-serif;
}

.test {
  background-color: #E9ECF0;
}
</style>
