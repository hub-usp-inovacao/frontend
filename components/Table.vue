<template>
  <div>
    <v-divider ref="start" class="my-4" />

    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma palavra-chave entre as disciplinas cadastradas"
        hide-details
        outlined
      />
    </v-container>

    <v-container class="hidden-md-and-up">
      <v-select :items="propsCampus" label="Campus" v-model="selectCampus" outlined />
      <v-select :items="propsUnity" label="Unidade" v-model="selectUnity" outlined />
      <v-select :items="propsField" label="Área" v-model="selectField" outlined />
      <v-select :items="propsLevel" label="Nível" v-model="selectLevel" outlined />
    </v-container>

    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col>
          <v-select :items="propsCampus" label="Campus" v-model="selectCampus" outlined />
        </v-col>
        <v-col>
          <v-select :items="propsUnity" label="Unidade" v-model="selectUnity" outlined />
        </v-col>
        <v-col>
          <v-select :items="propsField" label="Área" v-model="selectField" outlined />
        </v-col>
        <v-col>
          <v-select :items="propsLevel" label="Nível" v-model="selectLevel" outlined />
        </v-col>
      </v-row>
      <v-btn @click="clearFilters()">Limpar filtros</v-btn>
    </v-container>

    <v-container>
      <v-data-table
        class="my-12"
        :headers="propsHeaders"
        :items="propsSheet"
        :search="search"
        :items-per-page="itemsPerPage"
        :page="page"
        calculate-widths
        hide-default-footer
        no-data-text="Indexando Resultados"
      >
        <template v-slot:item.name="{item}">
          <a target="_blank" :href="item.url">{{item.name}}</a>
        </template>
      </v-data-table>

      <Pagination :propsLength="propsSheet.length" :propsPage="page" @input="page = $event" />
    </v-container>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";

export default {
  components: {
    Pagination
  },
  props: [
    "propsSheet",
    "propsHeaders",
    "propsCampus",
    "propsUnity",
    "propsField",
    "propsLevel"
  ],
  data: () => ({
    search: "",
    selectCampus: "",
    selectUnity: "",
    selectField: "",
    selectLevel: "",
    page: 1,
    options: {},
    itemsPerPage: 32
  }),
  methods: {
    setFilter() {
      this.propsHeaders.push({
        filter: (value, search, item) => {
          return (
            (!this.selectCampus || item.campus == this.selectCampus) &&
            (!this.selectUnity || item.unity == this.selectUnity) &&
            (!this.selectField || item.field == this.selectField) &&
            (!this.selectLevel || item.level == this.selectLevel)
          );
        }
      });
    },
    clearFilters() {
      this.search = "";
      this.selectCampus = "";
      this.selectUnity = "";
      this.selectField = "";
      this.selectLevel = "";
    }
  },
  watch: {
    page() {
      this.$vuetify.goTo(this.$refs.start, this.options);
    }
  },
  created() {
    this.setFilter();
  }
};
</script>
