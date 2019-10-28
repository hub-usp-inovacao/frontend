<template>
  <div>
    <v-divider ref="start" class="mb-6" />

    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma tecnologia ou empresa cadastrada"
        hide-details
        outlined
        clearable
      />

      <div class="hidden-md-and-up">
        <v-select
          class="my-4"
          :items="propsIncubator"
          label="Incubadora"
          v-model="selectIncubator"
          outlined
          hide-details
        />
        <v-select
          class="my-4"
          :items="propsCampus"
          label="Campus"
          v-model="selectCampus"
          outlined
          hide-details
        />
        <v-select
          class="my-4"
          :items="propsUnity"
          label="Unidade"
          v-model="selectUnity"
          outlined
          hide-details
        />
      </div>

      <div class="hidden-sm-and-down">
        <v-row>
          <v-col>
            <v-select
              :items="propsIncubator"
              label="Incubadora"
              v-model="selectIncubator"
              outlined
              hide-details
            />
          </v-col>
          <v-col>
            <v-select
              :items="propsCampus"
              label="Campus"
              v-model="selectCampus"
              outlined
              hide-details
            />
          </v-col>
          <v-col>
            <v-select
              :items="propsUnity"
              label="Unidade"
              v-model="selectUnity"
              outlined
              hide-details
            />
          </v-col>
        </v-row>
      </div>

      <v-btn @click="clearFilters()">Limpar filtros</v-btn>
    </v-container>

    <v-data-iterator
      :class="margin"
      :items="propsSheet"
      :items-per-page="itemsPerPage"
      :page="page"
      :custom-filter="customFilter"
      hide-default-footer
    >
      <template v-slot:default="props">
        <masonry :class="margin2" :cols="columns">
          <div v-for="item in props.items" :key="item.name">
            <Card :propsItem="item" :propsImage="true" v-on:test="a += $event" />
          </div>
        </masonry>

        <Pagination
          :propsLength="props.pagination.itemsLength"
          :propsPage="page"
          @input="page = $event"
        />
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Card from "../components/Card.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: {
    Card,
    Pagination
  },
  props: ["propsSheet", "propsIncubator", "propsCampus", "propsUnity"],
  data: () => ({
    search: "",
    columns: 1,
    typed: "",
    margin: "",
    margin2: "",
    page: 1,
    itemsPerPage: 32,
    selectIncubator: "",
    selectCampus: "",
    selectUnity: "",
    options: {}
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
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 3;
        case "xl":
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 4;
      }
    },
    customFilter(items, search) {
      let filtered = [];
      items.forEach(item => {
        if (
          (!this.selectIncubator || item.incubator == this.selectIncubator) &&
          (!this.selectCampus || item.campus == this.selectCampus) &&
          (!this.selectUnity || item.unity == this.selectUnity) &&
          (!this.typed || this.filterBySearch(item))
        )
          filtered.push(item);
      });
      return filtered;
    },
    filterBySearch(item) {
      let strings = Object.values(item);
      this.typed = this.typed.toLowerCase();
      for (let i = 0; i < strings.length; i++)
        if (strings[i].toLowerCase().includes(" " + this.typed)) {
          console.log(strings[i]);
          return true;
        }
      return false;
    },
    clearFilters() {
      this.search = "";
      this.selectIncubator = "";
      this.selectCampus = "";
      this.selectUnity = "";
    }
  },
  watch: {
    search: debounce(function() {
      this.typed = this.search;
    }, 400),
    page() {
      this.$vuetify.goTo(this.$refs.start, this.options);
    }
  },
  mounted() {
    this.columns = this.setCols();
  }
};
</script>

<style scoped>
.hoverUnderline:hover {
  text-decoration: underline;
}
</style>
