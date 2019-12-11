<template>
  <div>
    <v-carousel height="100vh" show-arrows cycle hide-delimiters>
      <v-carousel-item v-for="photo in photos" :key="photo">
        <v-img height="100vh" style="opacity: 0.8" :src="photo">
          <v-container>
            <div style="position: absolute; top: 30%">
              <slide-x-transition>
                <v-row>
                  <v-col>
                    <v-container
                      class="display-3 white--text zoom"
                      style="font-weight: bold; line-height: 1.3; text-align: left"
                    >
                      Conheça a
                      <span style="color: #e69027; background-color: #2353ba">Inovação</span> e
                      <span style="color: #2353ba; background-color: #e69027">Empreendedorismo</span> na Universidade de São Paulo
                    </v-container>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </slide-x-transition>
            </div>
          </v-container>
        </v-img>
      </v-carousel-item>
    </v-carousel>

    <v-container>
      <v-row class="align-content-center">
        <v-col class="align-self-end" data-aos-duration="3000" data-aos="zoom-in">
          <p class="display-4 font-weight-medium zoom">SOLUS</p>
          <p
            class="headline font-weight-light zoom"
          >Onde você encontra as iniciativas de inovação e empreendedorismo nos diversos campi da USP.</p>
        </v-col>
        <v-col>
          <div class="zoom">
            <v-img
              class="zoom"
              data-aos-duration="3000"
              data-aos="zoom-in"
              src="https://picsum.photos/400/250?random"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <v-row
        v-for="(item,i) in options"
        :key="item.title"
        :class="i % 2 ? 'flex-row-reverse' : 'flex-row'"
      >
        <v-col>
          <a :href="item.to">
            <div class="zoom">
              <v-img
                class="zoom"
                :data-aos="i % 2 ? 'fade-left' : 'fade-right'"
                data-aos-duration="3000"
                src="https://picsum.photos/300/200?random"
              ></v-img>
            </div>
          </a>
        </v-col>
        <v-col class="align-self-center">
          <div :data-aos="i % 2 ? 'fade-right' : 'fade-left'" data-aos-duration="3000">
            <p class="display-2 zoom" align="center" data-aos-delay="400">{{item.title}}</p>
            <p
              class="title font-weight-light zoom"
              align="center"
              data-aos-delay="400"
            >{{item.description}}</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
      "https://scontent.fcgh10-1.fna.fbcdn.net/v/t1.0-9/69706113_2451371548234209_8904991690364813312_n.jpg?_nc_cat=100&_nc_oc=AQkvGc7zPNgHoSwZitURzpgQdXrOvLxBtGCapb44J_InwoRAJ_2UnReaLOYyteUfTNk&_nc_ht=scontent.fcgh10-1.fna&oh=744435c1dcfe438f7c6cd614ef629707&oe=5E2582E6",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR129vKvGeA6u26aQGwm6wMkjWwGks7ekT-SzrgBB6drudKkrSA",
      "https://jornal.usp.br/wp-content/uploads/20180109_hackathon_OceanUSP_01.jpg"
    ]
  })
};
</script>
