<template>
  <v-app>
    <v-carousel height="100vh" show-arrows cycle>
      <v-carousel-item v-for="photo in photos" :key="photo">
        <v-img height="100vh" style="opacity: 0.8" :src="photo">
          <v-container>
            <div style="position: absolute; top: 30%">
              <slide-x-transition>
                <v-row>
                  <v-col>
                    <v-container
                      class="display-3 white--text"
                      style="font-weight: bold; line-height: 1.3; text-align: left"
                    >
                      Conheça a
                      <span class="black--text" style="background-color: red">Inovação</span> e
                      <span class="red--text" style="background-color: black">Empreendedorismo</span> na Universidade de São Paulo
                    </v-container>
                  </v-col>
                  <v-col></v-col>
                  <!-- <p
                  class="headline white--text"
                  >Conheça a Inovação e Empreendedorismo na Universidade de São Paulo</p>-->
                </v-row>
              </slide-x-transition>
            </div>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>
    <v-container class="d-block">
      <v-row>
        <v-col class="align-self-end">
          <p class="display-4 all">SOLUS</p>
          <p
            class="headline all"
          >Onde você encontra as iniciativas de inovação e empreendedorismo nos diversos campi da USP.</p>
        </v-col>
        <v-col>
          <v-img src="https://picsum.photos/400/250?random"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <!-- <v-container class="interhack" fluid></v-container> -->

    <v-divider class="my-12"></v-divider>
    <v-divider class="my-12"></v-divider>
    <!-- <v-divider class="my-12"></v-divider> -->

    <v-container>
      <!-- <template> -->
      <v-timeline>
        <v-timeline-item v-for="item in options" :key="item.title" hide-dot>
          <v-img data-aos="flip-up" slot="opposite" src="https://picsum.photos/300/200?random"></v-img>

          <v-container>
            <div data-aos="slide-up" data-aos-delay="400" class="headline">{{item.title}}</div>
            <div data-aos="slide-down" data-aos-delay="400">{{item.description}}</div>
          </v-container>
        </v-timeline-item>
      </v-timeline>
      <!-- </template> -->
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    options: [
      {
        title: "Iniciativas",
        description:
          "Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade."
      },
      {
        title: "Desenvolvimento & Inovação",
        description:
          "Laboratórios e grupos de pesquisa que atuam em projetos de inovação e empreendedorismo."
      },
      {
        title: "Educação",
        description:
          "Cursos e disciplinas para ensino de inovação e empreendedorismo na Universidade de São Paulo."
      },
      {
        title: "Empresas",
        description:
          "Diretório de empresas criadas por alunos e ex-alunos USP ao longo dos anos."
      }
    ],
    photos: [
      "http://www.imagens.usp.br/wp-content/uploads/Pra%C3%A7a_Relogio_106-17_Foto-Cec%C3%ADlia-Bastos-09.jpg",
      "https://scontent.fcgh10-1.fna.fbcdn.net/v/t1.0-9/69706113_2451371548234209_8904991690364813312_n.jpg?_nc_cat=100&_nc_oc=AQkvGc7zPNgHoSwZitURzpgQdXrOvLxBtGCapb44J_InwoRAJ_2UnReaLOYyteUfTNk&_nc_ht=scontent.fcgh10-1.fna&oh=744435c1dcfe438f7c6cd614ef629707&oe=5E2582E6",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR129vKvGeA6u26aQGwm6wMkjWwGks7ekT-SzrgBB6drudKkrSA",
      "https://jornal.usp.br/wp-content/uploads/20180109_hackathon_OceanUSP_01.jpg"
    ]
  })
};
</script>

<style scoped>
.transparent {
  background-color: transparent;
}
</style>
