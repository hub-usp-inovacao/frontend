<template>
  <div>
    <v-app>
      <v-carousel cycle height="100vh" hide-delimiters :show-arrows="false">
        <v-carousel-item v-for="(photo,i) in photos" :key="i" :src="photo"></v-carousel-item>
      </v-carousel>
      <div style="position: absolute; top: 0; height: 100vh; width: 100vw">
        <v-row class="fill-height">
          <v-col style="background-color: rgba(255, 167, 38, 0.9);" align-self="stretch">
            <v-row class="fill-height" justify="center">
              <v-col align-self="center" :cols="this.$vuetify.breakpoint.xs ? 12 : 8">
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
                    :style="this.$vuetify.breakpoint.xs ? 'width: 100%' : 'width: 70%'"
                  ></v-text-field>
                </v-container>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer class="hidden-sm-and-down" />
        </v-row>
      </div>
    </v-app>

    <v-app style="background-color: #FFA726">
      <v-container fill-height>
        <v-row align="center">
          <v-col>
            <p class="display-2 white--text font-weight-regular">Portal Solus</p>
            <p class="headline white--text font-weight-light">
              Faça uma busca e conheça a
              <span>inovação</span> e o empreendedorismo na Universidade de São Paulo
            </p>
            <v-text-field
              filled
              rounded
              color="white"
              label="Buscar no Solus"
              append-outer-icon="search"
              :style="this.$vuetify.breakpoint.xs ? 'width: 100%' : 'width: 70%'"
            ></v-text-field>
          </v-col>

          <v-spacer class="hidden-sm-and-down" />
        </v-row>
      </v-container>
    </v-app>

    <v-app>
      <v-container
        fluid
        fill-height
        style="background: linear-gradient(rgba(0,0,0,0.1), white, rgba(0,0,0,0.1));"
      >
        <v-container>
          <v-row align="baseline">
            <v-col>
              <v-row justify="center">
                <p
                  class="headline font-weight-regular"
                  align="center"
                >Empresas criadas por alunos da USP</p>
              </v-row>

              <v-row justify="center">
                <v-col v-for="n in 3" :key="n" cols="auto">
                  <v-icon color="#000" x-large>mdi-google</v-icon>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col>
                  <p class="headline font-weight-medium">Um mundo de inovações.</p>
                  <p
                    class="title font-weight-light"
                  >O Portal Solus conecta investidores, empreendedores e entusiastas às iniciativas e aos projetos ligados à inovação dentro da USP</p>
                </v-col>

                <v-col>
                  <v-card height="500px"></v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </v-app>
    <!-- <v-container class="py-10">
      <p align="center" class="display-4 font-weight-medium">SOLUS</p>
      <p
        align="center"
        class="headline font-weight-light"
      >Onde você encontra as iniciativas de inovação e empreendedorismo nos diversos campi da USP.</p>
    </v-container>

    <v-row
      v-for="(item, i) in options"
      :key="item.title"
      class="py-8 px-8"
      align="center"
      :style="i % 2 ? 'background-color: rgb(239, 127, 45)' : 'background-color: rgb(29, 112, 191)'"
    >
      <v-col class="pa-0" :style="i % 2 ? 'order: 2' : ''">
        <a :href="item.to">
          <div class="zoom">
            <v-img
              style="margin: auto; border-radius: 50%; width: 400px; height: 400px"
              class="zoom"
              :data-aos="i % 2 ? 'fade-left' : 'fade-right'"
              data-aos-duration="2000"
              :src="urls[i]"
            ></v-img>
          </div>
        </a>
      </v-col>
      <v-col class="pa-0" :style="i % 2 ? 'order: 1' : ''">
        <div :data-aos="i % 2 ? 'fade-right' : 'fade-left'" data-aos-duration="3000">
          <p
            class="display-2"
            style="color: white"
            align="center"
            data-aos-delay="400"
          >{{item.title}}</p>
          <p
            class="title font-weight-light"
            style="color: white"
            align="center"
            data-aos-delay="400"
          >{{item.description}}</p>
        </div>
      </v-col>
    </v-row>-->
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR129vKvGeA6u26aQGwm6wMkjWwGks7ekT-SzrgBB6drudKkrSA",
      "https://jornal.usp.br/wp-content/uploads/20180109_hackathon_OceanUSP_01.jpg"
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
  created() {}
};
</script>
