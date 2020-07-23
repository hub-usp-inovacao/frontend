<template>
  <div>
    <v-card class="hidden-sm-and-down" height="35rem" style="overflow-y: auto;">
      <v-card-title>Resultados de busca para "{{ searchedTerm }}":</v-card-title>
      <v-card-text>
        <v-list v-if="filtered.length > 0">
          <v-list-item-group>
            <v-list-item three-line v-for="item in filtered" :key="item.name">
              <v-list-item-content class="ml-2">
                <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-action>
                <v-chip>{{ item.category }}</v-chip>
              </v-list-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <p v-else>Nenhum resultado a exibir</p>
      </v-card-text>
    </v-card>
    <v-card class="hidden-md-and-up">
      <v-card-title>Resultados de busca para "{{ searchedTerm }}":</v-card-title>
      <v-card-text>
        <v-list v-if="filtered.length > 0">
          <v-list-item-group>
            <v-list-item three-line v-for="item in filtered" :key="item.name">
              <v-list-item-content class="ml-2">
                <v-list-item-title class="font-weight-bold">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-action>
                <v-chip>{{ item.category }}</v-chip>
              </v-list-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <p v-else>Nenhum resultado a exibir</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["searchedTerm", "filtered"]
};
</script>

<style>
</style>