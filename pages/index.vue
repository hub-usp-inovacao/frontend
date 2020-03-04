<template>
  <div>
    <v-app style="max-height: 100vh;">
      <v-carousel cycle height="100%" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(photo,i) in photos" :key="i" :src="photo"></v-carousel-item>
      </v-carousel>

      <div style="position: absolute; top: 0; height: 100%; width: 100%; overflow: auto;">
        <v-row class="fill-height fit-page ma-0">
          <v-col
            style="background-color: rgba(255, 167, 38, 0.9)"
            align-self="stretch"
            cols="12"
            sm="10"
            md="7"
          >
            <v-row class="fill-height" justify="center">
              <v-col align-self="center" cols="11" sm="10" class="pa-0">
                <v-container>
                  <p
                    class="white--text font-weight-medium"
                    :class="$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2'"
                  >Portal Solus</p>

                  <p
                    class="white--text ma-0"
                    :class="$vuetify.breakpoint.smAndDown ? 'body-1' : 'title'"
                  >Aqui você encontra as mais diversas informações sobre empreendedorismo e inovação na Universidade de São Paulo</p>

                  <p
                    class="white--text font-weight-light"
                    :class="$vuetify.breakpoint.smAndDown ? 'body-2' : 'body-1'"
                  >Você pode navegar usando as páginas específicas ou fazer uma busca geral utilizando palavras-chave.</p>

                  <v-text-field
                    solo
                    flat
                    rounded
                    color="white"
                    label="Buscar"
                    append-outer-icon="search"
                    :dense="$vuetify.breakpoint.smAndDown"
                    :style="setSearchBarWidth"
                  ></v-text-field>
                </v-container>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-app>

    <v-app>
      <v-container fill-height>
        <v-row class="ma-0" align="center">
          <v-col cols="12" sm="7">
            <p class="display-1 font-weight-medium ma-0">Um lugar só com:</p>

            <v-row
              class="fill-height"
              :class="$vuetify.breakpoint.smAndDown ? 'ml-2' : 'ml-6'"
              align-content="space-around"
            >
              <v-col cols="12">
                <p
                  class="title font-weight-regular"
                >&bull; As diversas iniciativas e estruturas da USP.</p>
              </v-col>

              <v-col cols="12">
                <p class="title font-weight-regular">&bull; Os pesquisadores e suas competências.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-regular"
                >&bull; Todas as patentes que a USP detém e disponibiliza para parceria com empresas e outras instituições interessadas.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-regular"
                >&bull; As disciplinas de graduação e pós-graduação sobre empreendedorismo e inovação.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-regular"
                >&bull; As empresas com DNA USP, criadas a partir de iniciativas incubadas na USP ou que seus fundadores e criadores foram alunos ou pesquisadores da USP.</p>
              </v-col>
            </v-row>
          </v-col>

          <v-col align-self="end">
            <img
              :src="require('@/vectors/home_globo.svg')"
              style="max-height: 80vh; max-width: 100%; content-fit: contain"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app>

    <v-app>
      <v-container fill-height>
        <v-container>
          <p class="display-1 font-weight-medium">USP: Um lugar para empreender e inovar</p>
        </v-container>

        <v-container>
          <p
            class="title font-weight-light"
          >A Universidade de São Paulo é, de acordo com diversos rankings nacionais e internacionais, a melhor universidade latino-americana e uma das melhores universidades do mundo. São mais de 5.000 professores e 70.000 alunos de graduação e pós, cuja significativa produção intelectual, está disponível para empresas e organizações por meio do:</p>
        </v-container>
      </v-container>

      <v-row justify="center" align="space-around">
        <v-col cols="3">
          <v-img :src="require('@/images/logo_ifood.svg')" height="10rem" contain />
        </v-col>
        <v-col cols="3">
          <v-img :src="require('@/images/logo_ifood.svg')" height="10rem" contain />
        </v-col>
        <v-col cols="3">
          <v-img :src="require('@/images/logo_ifood.svg')" height="10rem" contain />
        </v-col>
        <v-col cols="3">
          <v-img :src="require('@/images/logo_ifood.svg')" height="10rem" contain />
        </v-col>
      </v-row>
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
    }
  },
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