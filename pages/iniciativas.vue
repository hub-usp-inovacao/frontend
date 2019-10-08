<template>
  <v-app>
    <v-container>
      <h1>Iniciativas em Inovação e Empreendedorismo</h1>
      <p
        class="my-1"
      >Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade.</p>
      <v-btn
        class="mt-3 mb-6"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSd2gMMb3t01oDwYSbsgoUK1hCeEiC9zq7tt2AKzMoJ2Dcu1SA/viewform"
      >Cadastre a sua</v-btn>

      <List propsCategory="Grupos Estudantis" propsColor="#e3584b" />
      <List propsCategory="Espaços e Laboratórios" propsColor="#966acc" />
      <List propsCategory="Ideação" propsColor="#77d47b" />
      <List propsCategory="Grupos de Pesquisa" propsColor="#f0e660" />
      <List propsCategory="Incubadora de Empresas" propsColor="#678fe6" />
    </v-container>
  </v-app>
</template>

<script>
import List from "../components/List.vue";

export default {
  components: {
    List
  }
};
</script>
