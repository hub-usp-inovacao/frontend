<template>
  <div>
    <h1 align="center" style="text-transform: uppercase" class="font-weight-light">
      <v-container>{{propsCategory}}</v-container>
    </h1>

    <v-data-iterator
      :items="propsData"
      :items-per-page="128"
      :custom-filter="customFilter"
      hide-default-footer
      no-data-text="Carregando dados..."
    >
      <template v-slot:default="props">
        <masonry :cols="2">
          <div v-for="item in props.items" :key="item.name">
            <Card :propsColor="propsColor" :propsItem="item" :propsFont="true" />
          </div>
        </masonry>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  components: {
    Card
  },
  props: [
    "propsCategory",
    "propsColor",
    "propsData",
    "propsSearch",
    "propsCampus",
    "propsUnity"
  ],
  data: () => ({
    columns: 1
  }),
  methods: {
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 3;
        case "xl":
          return 4;
      }
    },
    customFilter(items, search) {
      let filtered = [];
      items.forEach(item => {
        if (
          (!this.propsCampus.length ||
            this.propsCampus.includes(item.campus)) &&
          (!this.propsUnity.length || this.propsUnity.includes(item.unity)) &&
          (!this.propsSearch || this.filterBySearch(item))
        )
          filtered.push(item);
      });
      return filtered;
    },
    filterBySearch(item) {
      let strings = Object.values(item);
      this.propsSearch = this.propsSearch.toLowerCase();

      for (let i = 0; i < strings.length; i++) {
        strings[i] = " " + strings[i];
        if (strings[i].toLowerCase().includes(" " + this.propsSearch))
          return true;
      }
      return false;
    }
  },
  mounted() {
    this.columns = this.setCols();
  }
};
</script>
