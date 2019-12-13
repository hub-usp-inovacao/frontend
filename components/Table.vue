<template>
  <div>
    <v-divider ref="start" class="my-4" />

    <v-container>
      <Input :propsModel="search" @input="search = $event" />
    </v-container>

    <v-container v-for="property in propsProperties" :key="property.label" class="hidden-md-and-up">
      <Select
        :propsItems="property.data"
        :propsLabel="property.label"
        :propsModel="property.select"
        @input="property.select = $event"
      />
    </v-container>

    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col v-for="property in propsProperties" :key="property.label">
          <Select
            :propsItems="property.data"
            :propsLabel="property.label"
            :propsModel="property.select"
            @input="property.select = $event"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-btn @click="clearFilters()">Limpar filtros</v-btn>
    </v-container>

    <v-container>
      <v-data-table
        class="my-12"
        :headers="propsHeaders"
        :items="propsSheet"
        :search="search"
        :items-per-page="200"
        no-data-text="Indexando resultados ..."
        calculate-widths
        hide-default-footer
      >
        <template v-slot:item.name="{item}">
          <a target="_blank" :href="item.url">{{item.name}}</a>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
import Select from "../components/Select.vue";
import Input from "../components/Input.vue";

export default {
  components: {
    Pagination,
    Select,
    Input
  },
  props: ["propsSheet", "propsHeaders", "propsProperties"],
  data: () => ({
    search: ""
  }),
  methods: {
    setFilter() {
      this.propsHeaders.push({
        filter: (value, search, item) => {
          return (
            (!this.propsProperties.campus.select.length ||
              this.propsProperties.campus.select.includes(item.campus)) &&
            (!this.propsProperties.unities.select.length ||
              this.propsProperties.unities.select.includes(item.unity)) &&
            (!this.propsProperties.fields.select.length ||
              this.propsProperties.fields.select.includes(item.field)) &&
            (!this.propsProperties.levels.select.length ||
              this.propsProperties.levels.select.includes(item.level)) &&
            (!this.propsProperties.categories.select.length ||
              this.propsProperties.categories.select.includes(item.category))
          );
        }
      });
    },
    clearFilters() {
      this.search = "";
      Object.values(this.propsProperties).forEach(property => {
        property.select = [];
      });
    }
  },
  mounted() {
    this.setFilter();
  }
};
</script>
