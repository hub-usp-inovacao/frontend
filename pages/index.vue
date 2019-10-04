<template>
  <v-app>
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
    ]
  })
};
</script>

<style scoped>
.transparent {
  background-color: transparent;
}
</style>
