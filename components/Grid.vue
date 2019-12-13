<template>
  <div>
    <v-divider ref="start" class="mb-6" />

    <v-container style="width: 100%; background-color: rgba(239, 127, 45, 0.84)">
      <Input :propsModel="search" @input="search = $event" />

      <div class="hidden-md-and-up">
        <Select
          :propsItems="propsIncubator"
          propsLabel="Incubadora"
          :propsModel="selectIncubator"
          @input="selectIncubator = $event"
        />
        <Select
          :propsItems="propsCampus"
          propsLabel="Campus"
          :propsModel="selectCampus"
          @input="selectCampus = $event"
        />
        <Select
          :propsItems="propsUnity"
          propsLabel="Unidade"
          :propsModel="selectUnity"
          @input="selectUnity = $event"
        />
        <Select
          :propsItems="propsCNAE"
          propsLabel="CNAE"
          :propsModel="selectCNAE"
          @input="selectCNAE = $event"
        />
      </div>

      <div class="hidden-sm-and-down">
        <v-row>
          <v-col>
            <Select
              :propsItems="propsIncubator"
              propsLabel="Incubadora"
              :propsModel="selectIncubator"
              @input="selectIncubator = $event"
            />
          </v-col>
          <v-col>
            <Select
              :propsItems="propsCampus"
              propsLabel="Campus"
              :propsModel="selectCampus"
              @input="selectCampus = $event"
            />
          </v-col>
          <v-col>
            <Select
              :propsItems="propsUnity"
              propsLabel="Unidade"
              :propsModel="selectUnity"
              @input="selectUnity = $event"
            />
          </v-col>
          <v-col>
            <Select
              :propsItems="propsCNAE"
              propsLabel="CNAE"
              :propsModel="selectCNAE"
              @input="selectCNAE = $event"
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
      loading
      loading-text="Indexando resultados ..."
      hide-default-footer
    >
      <template v-slot:default="props">
        <masonry :class="margin2" :cols="columns">
          <v-container v-for="item in props.items" :key="item.name">
            <Card :propsItem="item" :propsImage="true" v-on:test="a += $event" />
          </v-container>
        </masonry>

        <Pagination
          :propsLength="props.pagination.itemsLength"
          :propsPage="page"
          :propsItemsPerPage="itemsPerPage"
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
import Select from "../components/Select.vue";
import Input from "../components/Input.vue";

export default {
  components: {
    Card,
    Pagination,
    Select,
    Input
  },
  props: [
    "propsSheet",
    "propsIncubator",
    "propsCampus",
    "propsUnity",
    "propsCNAE"
  ],
  data: () => ({
    search: "",
    columns: 1,
    typed: "",
    margin: "",
    margin2: "",
    page: 1,
    itemsPerPage: 32,
    selectIncubator: [],
    selectCampus: [],
    selectUnity: [],
    selectCNAE: [],
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
          (!this.selectIncubator.length ||
            this.selectIncubator.includes(item.incubator)) &&
          (!this.selectCampus.length ||
            this.selectCampus.includes(item.campus)) &&
          (!this.selectUnity.length || this.selectUnity.includes(item.unity)) &&
          (!this.selectCNAE.length || this.selectCNAE.includes(item.cnae)) &&
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
        if (strings[i].toLowerCase().includes(" " + this.typed)) return true;
      return false;
    },
    clearFilters() {
      this.search = "";
      this.selectIncubator = [];
      this.selectCampus = [];
      this.selectUnity = [];
      this.selectCNAE = [];
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
