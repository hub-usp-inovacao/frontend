<template>
  <v-app>
    <Description
      propsTitle="Iniciativas em Inovação e Empreendedorismo"
      propsDescription="Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSd2gMMb3t01oDwYSbsgoUK1hCeEiC9zq7tt2AKzMoJ2Dcu1SA/viewform"
    />

    <v-container>
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
import Description from "../components/Description.vue";

export default {
  components: {
    List,
    Description
  }
};
</script>
