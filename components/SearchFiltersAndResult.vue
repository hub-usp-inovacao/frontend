<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-card height="18rem">
          <v-card-title>Filtros:</v-card-title>
          <v-card-text>
            <v-chip-group :column="true" :multiple="true" v-model="selected">
              <v-chip
                v-for="category in categories"
                :key="category"
                :value="category"
                filter
                outlined
              >{{ category }}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="10">
        <v-card height="35rem" style="overflow-y: auto;">
          <v-card-title>Resultados:</v-card-title>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    categories: [
      "Educação",
      "Iniciativas",
      "P&D&I",
      "Patentes",
      "Empresas",
      "Competências"
    ],
    selected: []
  }),
  props: ["items"],
  computed: {
    filtered() {
      if (this.selected.length == 0) {
        return this.items;
      }

      return this.items.filter(i => this.selected.includes(i.category));
    }
  }
};
</script>

<style scoped>
</style>