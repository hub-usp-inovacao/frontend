<template>
  <v-app style="max-height: 100vh;">
    <v-carousel cycle height="100%" hide-delimiters :show-arrows="false">
      <v-carousel-item v-for="(photo, i) in photos" :key="i" :src="photo"></v-carousel-item>
    </v-carousel>

    <div
      style="
          position: absolute;
          top: 0;
          height: 100%;
          width: 100%;
          overflow: auto;
        "
    >
      <v-row class="fill-height fit-page ma-0">
        <v-col
          style="background-color: rgba(255, 177, 99, 0.9);"
          align-self="stretch"
          cols="12"
          sm="10"
          md="7"
        >
          <v-row class="fill-height" justify="center">
            <v-col align-self="center" cols="11" sm="10" class="pa-0">
              <v-container>
                <v-row>
                  <v-col cols="8" offset="1">
                    <p
                      class="white--text font-weight-medium"
                      :class="
                          $breakpoint.smAndDown ? 'display-1' : 'display-2'
                        "
                    >Portal Solus</p>
                    <p
                      class="white--text font-weight-medium ma-0"
                      :class="$breakpoint.smAndDown ? 'body-1' : 'title'"
                    >
                      Aqui você encontra as mais diversas informações sobre
                      empreendedorismo e inovação na Universidade de São Paulo
                    </p>
                  </v-col>
                </v-row>

                <v-row class="mt-10">
                  <v-col offset="1" cols="10">
                    <p
                      class="white--text font-weight-light"
                      :class="$breakpoint.smAndDown ? 'body-2' : 'body-1'"
                    >
                      Você pode navegar usando as páginas específicas ou fazer
                      uma busca geral utilizando palavras-chave.
                    </p>

                    <v-text-field
                      v-model="search"
                      solo
                      flat
                      rounded
                      label="Buscar"
                      append-outer-icon="search"
                      :dense="$breakpoint.smAndDown"
                      :style="setSearchBarWidth"
                      @keydown.enter="submitSearch"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row style="height: 30vh;" align="end" md-align="end">
                  <v-col cols="4" offset="1" md="2" offset-md="1">
                    <v-img :src="require('@/vectors/auspin-white.svg')"></v-img>
                  </v-col>
                  <v-col cols="4" offset="1" md="2" offset-md="1">
                    <v-img :src="require('@/vectors/usp-white.svg')"></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    search: "",
    photos: [
      "http://www.imagens.usp.br/wp-content/uploads/Pra%C3%A7a_Relogio_106-17_Foto-Cec%C3%ADlia-Bastos-09.jpg",
      "http://imagens.usp.br/wp-content/uploads/Nova-Vers%C3%A3o-do-Chip-Sampa-Foto-Marcos-Santos-USP-Imagens-12.jpg",
      "http://imagens.usp.br/wp-content/uploads/Centro-de-Pesquisa-e-Inova%C3%A7%C3%A3o-Inova-USP_U0Y8422.jpg",
      "http://imagens.usp.br/wp-content/uploads/27112013simuladorpolitpnfotomarcossantos004.jpg",
    ],
  }),
  computed: {
    setSearchBarWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return { width: "100%" };
        case "sm":
          return { width: "80%" };
        default:
          return { width: "60%" };
      }
    },
  },
  methods: {
    submitSearch() {
      this.$emit("search", this.search);
    },
  },
};
</script>

<style scoped>
.fit-page {
  max-width: 100%;
  max-height: 100%;
}
</style>