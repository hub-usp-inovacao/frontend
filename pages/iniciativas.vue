<template>
  <v-app>
    <v-tabs>
      <v-tab>Agentes Institucionais</v-tab>
      <v-tab>Entidades Estudantis</v-tab>
      <v-tab>Espaços e Coworking</v-tab>
      <v-tab>Ideação e Viabilidade</v-tab>
      <v-tab>Incubadoras e Parques Tecnologias</v-tab>
      <v-tab-item>
        <v-container>
          <List op="Finance"/>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <List op="Health Care"/>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <List op="Technology"/>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <List op="Capital Goods"/>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <List op="n/a"/>
        </v-container>
      </v-tab-item>
    </v-tabs>
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
