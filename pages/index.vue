<template>
  <div>
    <v-app>
      <v-carousel cycle height="100vh" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(photo,i) in photos" :key="i" :src="photo"></v-carousel-item>
      </v-carousel>

      <div style="position: absolute; top: 0; height: 100%; width: 100%;">
        <v-row class="fill-height fit-page mx-0">
          <v-col
            style="background-color: rgba(255, 167, 38, 0.9); "
            cols="12"
            sm="8"
            md="6"
            align-self="stretch"
          >
            <v-row class="fill-height" justify="center">
              <v-col align-self="center" cols="10" sm="8">
                <v-container>
                  <p class="display-2 white--text font-weight-medium">Portal Solus</p>
                  <p class="headline white--text font-weight-light">
                    Faça uma busca e conheça a
                    inovação e o empreendedorismo na Universidade de São Paulo
                  </p>
                  <v-text-field
                    solo
                    flat
                    rounded
                    color="white"
                    label="Buscar no Solus"
                    append-outer-icon="search"
                    :style="$vuetify.breakpoint.xs ? 'width: 100%' : 'width: 90%'"
                  ></v-text-field>
                </v-container>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-app>

    <v-app>
      <v-container fluid fill-height style="background: linear-gradient(rgba(0,0,0,0.15), white);">
        <v-container>
          <v-row align="baseline">
            <v-col>
              <v-row justify="center">
                <v-col>
                  <p
                    class="headline font-weight-regular"
                    align="center"
                  >Empresas criadas por alunos da USP</p>
                </v-col>
              </v-row>

              <v-row justify="space-around" align="center">
                <img :src="require('@/images/logo_ifood.svg')" style="height: 12vh;" />

                <img :src="require('@/images/logo_99taxi.png')" style="height: 12vh;" />

                <img :src="require('@/images/logo_gympass.png')" style="height: 4vh;" />
              </v-row>

              <v-row align="center">
                <v-col cols="12" sm="6">
                  <p class="headline font-weight-medium">Um mundo de inovações.</p>
                  <p
                    class="title font-weight-light"
                  >O Portal Solus conecta investidores, empreendedores e entusiastas às iniciativas e aos projetos ligados à inovação dentro da USP</p>
                </v-col>

                <v-col>
                  <img
                    :src="require('@/vectors/home_globo.svg')"
                    style="max-height: 80vh; max-width: 100%; object-fit: contain;"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-app>

    <v-app>
      <v-container fill-height>
        <v-row justify="center" align="baseline">
          <v-col cols="10" sm="8">
            <v-row justify="center">
              <v-col>
                <p
                  class="headline font-weight-medium text-center"
                >Com uma extensa biblioteca disponível.</p>
                <p
                  class="title font-weight-light"
                >Tenha acesso a um grande acervo de projetos, espaços de coworking, empresas juniores, instituições e muito mais.</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-img
        :src="require('@/images/background_cards.svg')"
        width="100vw"
        gradient="white, transparent 30%"
      ></v-img>
    </v-app>

    <v-app>
      <v-container fill-height fluid style="background-color: rgba(255, 167, 38, 0.9); ">
        <v-container>
          <v-row justify="center" align="baseline">
            <v-col cols="10" sm="6">
              <p
                class="headline white--text font-weight-medium text-center"
              >Abrangendo todos os campi da USP.</p>

              <p
                class="title white--text font-weight-light text-center"
              >De Ribeirão Preto a Lorena. O Solus tem cobertura em todos os projetos da Universidade</p>
            </v-col>

            <img
              :src="require('@/vectors/home_mapa.svg')"
              style="max-width: 80vw; max-height: 80vh;"
            />
          </v-row>
        </v-container>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    options: [
      {
        title: "Iniciativas",
        description:
          "Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade.",
        to: "/iniciativas"
      },
      {
        title: "Desenvolvimento & Inovação",
        description:
          "Laboratórios e grupos de pesquisa que atuam em projetos de inovação e empreendedorismo.",
        to: "/desenvolvimento-e-inovacao"
      },
      {
        title: "Educação",
        description:
          "Cursos e disciplinas para ensino de inovação e empreendedorismo na Universidade de São Paulo.",
        to: "/educacao"
      },
      {
        title: "Empresas",
        description:
          "Diretório de empresas criadas por alunos e ex-alunos USP ao longo dos anos.",
        to: "/empresas"
      }
    ],
    photos: [
      "http://www.imagens.usp.br/wp-content/uploads/Pra%C3%A7a_Relogio_106-17_Foto-Cec%C3%ADlia-Bastos-09.jpg",
      "http://imagens.usp.br/wp-content/uploads/Nova-Vers%C3%A3o-do-Chip-Sampa-Foto-Marcos-Santos-USP-Imagens-12.jpg",
      "http://imagens.usp.br/wp-content/uploads/Centro-de-Pesquisa-e-Inova%C3%A7%C3%A3o-Inova-USP_U0Y8422.jpg",
      "http://imagens.usp.br/wp-content/uploads/27112013simuladorpolitpnfotomarcossantos004.jpg"
    ],
    urls: [
      "http://imagens.usp.br/wp-content/uploads/Poli_Febrace_81-16_foto-Cec%C3%ADlia-Bastos-30.jpg",
      "http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg",
      "http://imagens.usp.br/wp-content/uploads/Lab._Engenharia_Separa%C3%A7%C3%B5es_FVZEA_285-18_foto-Cec%C3%ADlia-Bastos-34.jpg",
      "http://imagens.usp.br/wp-content/uploads/Projeto-Arte-e-Ci%C3%AAncia_IF_Foto-Marcos-Santos_U0Y8223-1-scaled.jpg"
    ]
  }),
  head: {
    title: "Solus",
    meta: [
      {
        name: "google-site-verification",
        content: "6_EEYtY0wjahRpeFmJZ7qcVSuABHdi4mV5wa8Y1FmlE"
      }
    ]
  },
  created() {
    console.log(this.$vuetify);
  }
};
</script>

<style >
.fit-page {
  max-width: 100%;
  max-height: 100%;
}
</style>