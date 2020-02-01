<template>
  <div>
    <v-img
      height="100vh"
      src="http://imagens.usp.br/wp-content/uploads/Caverda-digital-391-15-Foto-Marcos-Santos20150916_014.jpg"
    >
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
                  <span
                    style="color: rgb(239, 127, 45); background-color: rgb(29, 112, 191)"
                  >Inovação</span> e
                  <span
                    style="color: rgb(29, 112, 191); background-color: rgb(239, 127, 45)"
                  >Empreendedorismo</span> na Universidade de São Paulo
                </v-container>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </slide-x-transition>
        </div>
      </v-container>
    </v-img>

    <v-container class="py-10">
      <p align="center" class="display-4 font-weight-medium">SOLUS</p>
      <p
        align="center"
        class="headline font-weight-light"
      >Onde você encontra as iniciativas de inovação e empreendedorismo nos diversos campi da USP.</p>
    </v-container>

    <v-divider />
    <v-row
      v-for="(item, i) in options"
      :key="item.title"
      class="py-8 px-8"
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
      <v-col class="align-self-center pa-0" :style="i % 2 ? 'order: 1' : ''">
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
    </v-row>
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
    ],
    urls: [
      "http://imagens.usp.br/wp-content/uploads/Poli_Febrace_81-16_foto-Cec%C3%ADlia-Bastos-30.jpg",
      "http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg",
      "http://imagens.usp.br/wp-content/uploads/Lab._Engenharia_Separa%C3%A7%C3%B5es_FVZEA_285-18_foto-Cec%C3%ADlia-Bastos-34.jpg",
      "http://imagens.usp.br/wp-content/uploads/Projeto-Arte-e-Ci%C3%AAncia_IF_Foto-Marcos-Santos_U0Y8223-1-scaled.jpg"
    ]
  })
};
</script>
