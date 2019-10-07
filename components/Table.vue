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
      >
        <template v-slot:item.name="{item}">
          <a target="_blank" :href="item.url">{{item.name}}</a>
        </template>
      </v-data-table>

      <v-pagination v-model="page" :length="numberOfPages(propsSheet.length)" total-visible="7" />
    </v-container>
  </div>
</template>

<script>
export default {
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
    distinct: [],
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
    },
    numberOfPages(length) {
      return Math.ceil(length / this.itemsPerPage);
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
