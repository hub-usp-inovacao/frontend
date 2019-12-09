<template>
  <div>
    <h1 align="center" style="text-transform: uppercase" class="font-weight-light">
      <v-container>{{propsCategory}}</v-container>
    </h1>

    <v-data-iterator
      :items="propsData"
      :search="propsSearch"
      :items-per-page="128"
      hide-default-footer
      no-data-text="Carregando dados..."
    >
      <template v-slot:default="props">
        <masonry :cols="columns">
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
  props: ["propsCategory", "propsColor", "propsData", "propsSearch"],
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
    }
  },
  mounted() {
    this.columns = this.setCols();
  }
};
</script>
