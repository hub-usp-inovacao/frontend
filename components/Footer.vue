<template>
  <v-footer dark padless>
    <v-card class="flex" dark flat tile>
      <v-card-title>
        <v-container>
          <div
            class="font-weight-light"
            style="font-size: 18px"
            align="center"
          >Conheça também nossas páginas nas Redes Socias!</div>
        </v-container>

        <v-container>
          <div align="center">
            <v-btn target="_blank" :href="icon.url" v-for="icon in icons" :key="icon.label" class="mx-4 zoom" dark icon fab>
              <v-icon size="35px">{{ icon.label }}</v-icon>
            </v-btn>
          </div>
        </v-container>
      </v-card-title>

      <v-container>
        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} —
          <strong>AUSPIN</strong>
        </v-card-text>
      </v-container>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        label: "mdi-facebook",
        url: "https://www.facebook.com/inovacaonausp/"
      },
      {
        label: "mdi-twitter",
        url: "https://twitter.com/inovacaonausp"
      },
      {
        label: "mdi-linkedin",
        url: "https://www.linkedin.com/in/inovacaonausp/"
      },
      {
        label: "mdi-instagram",
        url: "http://www.instagram.com/inovacaonausp/"
      },
    ]
  })
};
</script>
