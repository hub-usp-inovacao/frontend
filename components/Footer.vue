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
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 zoom" dark icon>
              <v-icon size="35px">{{ icon }}</v-icon>
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
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  })
};
</script>
