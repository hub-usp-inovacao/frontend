<template>
  <div>
    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col cols="2">
          <SearchFilterCard :categories="categories" @select="selected = $event" />
        </v-col>
        <v-col cols="10">
          <SearchDetailsCard :searchedTerm="searchedTerm" :filtered="filtered" />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="hidden-md-and-up">
      <v-row>
        <SearchFilterCard :categories="categories" @select="selected = $event" />
      </v-row>
      <v-row>
        <SearchDetailsCard :searchedTerm="searchedTerm" :filtered="filtered" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SearchFilterCard from "@/components/second_level/SearchFilterCard.vue";
import SearchDetailsCard from "@/components/second_level/SearchDetailsCard.vue";

export default {
  components: {
    SearchFilterCard,
    SearchDetailsCard,
  },
  data: () => ({
    categories: [
      "Educação",
      "Iniciativas",
      "P&D&I",
      "Patentes",
      "Empresas",
      "Competências",
    ],
    selected: [],
  }),
  props: ["items", "searchedTerm"],
  computed: {
    filtered() {
      if (this.selected.length == 0) {
        return this.items;
      }

      return this.items.filter((i) => this.selected.includes(i.category));
    },
  },
};
</script>

<style scoped>
</style>