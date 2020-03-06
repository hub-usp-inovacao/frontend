<template>
  <div>
    <!-- Land -->
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

    <!-- Um lugar só com... -->
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
                  class="title font-weight-light"
                >&bull; As diversas iniciativas e estruturas da USP.</p>
              </v-col>

              <v-col cols="12">
                <p class="title font-weight-light">&bull; Os pesquisadores e suas competências.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-light"
                >&bull; Todas as patentes que a USP detém e disponibiliza para parceria com empresas e outras instituições interessadas.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-light"
                >&bull; As disciplinas de graduação e pós-graduação sobre empreendedorismo e inovação.</p>
              </v-col>

              <v-col cols="12">
                <p
                  class="title font-weight-light"
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

    <!-- USP: Um lugar para empreender... -->
    <v-app>
      <v-container fill-height>
        <v-container>
          <v-container>
            <p class="display-1 font-weight-medium">USP: Um lugar para empreender e inovar</p>
          </v-container>

          <v-container>
            <p
              class="title font-weight-light"
            >A Universidade de São Paulo é, de acordo com diversos rankings nacionais e internacionais, a melhor universidade latino-americana e uma das melhores universidades do mundo. São mais de 5.000 professores e 70.000 alunos de graduação e pós, cuja significativa produção intelectual, está disponível para empresas e organizações por meio do:</p>
          </v-container>

          <v-row justify="center" align="center" class="ma-0">
            <v-col cols="6" lg="3">
              <v-row justify="center">
                <img :src="require('@/vectors/home_patents_icon.svg')" />
              </v-row>

              <p class="mt-5 display-1 text-center" style="color: #4AD5FF">Licenciamento de patentes</p>
            </v-col>

            <v-col cols="6" lg="3">
              <v-row justify="center">
                <img :src="require('@/vectors/home_partnership_icon.svg')" />
              </v-row>

              <p class="mt-5 display-1 text-center" style="color: #4AD5FF">Parcerias de pesquisas</p>
            </v-col>

            <v-col cols="6" lg="3">
              <v-row justify="center">
                <img :src="require('@/vectors/home_teaching_icon.svg')" />
              </v-row>

              <p class="mt-5 display-1 text-center" style="color: #4AD5FF">Cursos</p>
            </v-col>

            <v-col cols="6" lg="3">
              <v-row justify="center">
                <img :src="require('@/vectors/home_events_icon.svg')" />
              </v-row>

              <p class="mt-5 display-1 text-center" style="color: #4AD5FF">Eventos</p>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-app>

    <!-- Solus: Encontre o que voce... -->
    <v-app>
      <v-container fill-height fluid style="background-color: #3890E8 ">
        <v-container fill-height>
          <v-row class="ma-0 fill-height" align="center">
            <v-col cols="12" sm="7">
              <p
                class="display-1 white--text font-weight-medium mb-8"
              >Solus: Encontre o que você procura</p>

              <p class="title white--text font-weight-light">
                O Portal Solus facilita a conexão entre a sociedade e a USP.
                Simples e intuitivo, basta digitar palavras-chave na ferramenta de
                busca para obter os contatos de instituições, estruturas, empresas
                e pesquisadores especialistas nos assuntos buscados.
              </p>
            </v-col>

            <v-col cols="12" sm="5">
              <v-card flat tile width="100%" height="15rem" color="#38E8E2">
                <v-container fill-height>
                  <v-row justify="center" class="ma-0">
                    <v-col cols="12">
                      <v-text-field solo flat rounded readonly append-outer-icon="search">
                        <template v-slot:label>
                          <vue-typer :text="search_bar"></vue-typer>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-app>

    <!-- DNA USP -->
    <v-app>
      <v-container fill-height>
        <v-container>
          <v-row justify="center" class="ma-0">
            <v-col cols="12" md="5">
              <v-row justify="center">
                <img
                  :src="require('@/vectors/home_dna_usp.svg')"
                  style="max-width: 100%; max-height: 100%; object-fit: contain;"
                />
              </v-row>
            </v-col>

            <v-col cols="12" md="7">
              <p class="display-1 font-weight-medium ma-0">Empresas com DNA USP:</p>

              <p
                class="display-1 font-weight-medium"
              >Resultados de uma Universidade Inovadora e Empreendora</p>

              <p class="title font-weight-light">
                A marca DNA USP foi criada para identificar empresas constituídas por
                alunos, ex-alunos e pesquisadores que passaram pela Universidade de
                São Paulo ao longo dos anos, bem como empresas resultantes de
                processos de incubação ou de aceleração em alguma das incubadoras
                associadas à USP.
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    search_bar: [
      "Buscar",
      "Biotecnologia",
      "Laboratórios",
      "Inteligência Artificial"
    ],
    photos: [
      "http://www.imagens.usp.br/wp-content/uploads/Pra%C3%A7a_Relogio_106-17_Foto-Cec%C3%ADlia-Bastos-09.jpg",
      "http://imagens.usp.br/wp-content/uploads/Nova-Vers%C3%A3o-do-Chip-Sampa-Foto-Marcos-Santos-USP-Imagens-12.jpg",
      "http://imagens.usp.br/wp-content/uploads/Centro-de-Pesquisa-e-Inova%C3%A7%C3%A3o-Inova-USP_U0Y8422.jpg",
      "http://imagens.usp.br/wp-content/uploads/27112013simuladorpolitpnfotomarcossantos004.jpg"
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