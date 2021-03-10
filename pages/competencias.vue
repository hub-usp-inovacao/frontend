<template>
  <div style="min-height: 100vh">
    <div class="background">
      <Panel
        title="Competências"
        description="Nesta seção, você pode consultar quais as competências dos pesquisadores da USP, quem são e como contatá-los. O Portal Solus utiliza como parâmetro de divisão de competências a Tabela das Áreas do Conhecimento apresentada pelo CNPq, e divide-as em dois níveis principais correspondentes, respectivamente, à área do conhecimento (ex.: Ciências Exatas e da Terra) e sua sub-área (ex.: Matemática)."
        url="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
        forms-call="Cadastre suas competências"
        @search="changeSearchTerm"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ active: '#9b4c68', base: '#6b1c28' }"
      :groups="groups"
      @select="filters = $event"
    />

    <DisplayData
      :items="displayItems"
      group-name="Pesquisador"
      :selected="globalSearchSelected"
    >
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <v-container>
          <v-row v-for="{ name, label, site } in item.labsOrGroups" :key="name">
            <v-col v-if="site">
              <a :href="site" target="_blank">
                {{ label }}
              </a>
            </v-col>
            <v-col v-else>{{ label }}</v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>{{ item.email }}</span>
            </v-col>
          </v-row>
          <v-row v-if="item.phone">
            <v-col>
              <span>{{ item.phone }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>{{ item.unities.join(", ") }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <span>{{ item.campus }}</span>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template #detailsImg="{ item }">
        <v-img v-if="item.picture" eager :src="item.picture"></v-img>
      </template>
      <template #content="{ item }">
        <v-expansion-panels>
          <v-expansion-panel v-for="desc in itemDescriptions" :key="desc.key">
            <v-expansion-panel-header class="font-weight-bold">
              {{ desc.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item
                  v-for="description in item.descriptions[desc.key]"
                  :key="description"
                >
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-circle-small'"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <p class="mb-0">{{ description }}</p>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
      <template #actions="{ item }">
        <div class="d-flex justify-space-around flex-wrap" style="width: 100%">
          <v-btn
            class="white--text"
            color="#6b1c28"
            target="_blank"
            :disabled="!item.url"
            :href="item.url"
            >saiba mais</v-btn
          >
          <v-btn
            class="white--text"
            color="#6b1c28"
            target="_blank"
            :disabled="!item.lattes"
            :href="item.lattes"
            >lattes</v-btn
          >
        </div>
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib/search";
import { removeAccent } from "@/lib/format";

import Background from "@/components/first_level/Background.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import DisplayData from "@/components/first_level/DisplayData.vue";

export default {
  components: {
    Panel,
    Background,
    MultipleFilters,
    DisplayData,
  },
  data: () => ({
    search: {
      term: "",
      skills: undefined,
    },

    itemDescriptions: [
      { key: "skills", title: "Competências" },
      { key: "services", title: "Serviços Tecnológicos" },
      { key: "equipments", title: "Equipamentos" },
    ],

    filters: undefined,
    filtered: undefined,

    unities: undefined,
  }),
  computed: {
    ...mapGetters({
      dataStatus: "competencia/dataStatus",
      skills: "competencia/skills",
      searchKeys: "competencia/searchKeys",
    }),
    tabs() {
      return this.$knowledgeAreas.map((area) => ({ ...area, description: "" }));
    },
    groups() {
      return [
        {
          label: "Campus",
          items: this.$campi.map((c) => c.name),
        },
        {
          label: "Unidade",
          items:
            this.unities == undefined
              ? this.$campi
                  .reduce((acc, value) => {
                    return acc.concat(value.unities);
                  }, [])
                  .sort()
              : this.unities,
        },
      ];
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.skills;
    },
    displayItems() {
      return this.search.skills !== undefined
        ? this.search.skills
        : this.baseItems;
    },
    displayMultipleUnities(unities) {
      return unities.join(", ");
    },
    searchTerm() {
      return this.search.term;
    },
    globalSearchSelected() {
      if (this.$route.params.id)
        return this.displayItems.find(
          (item) => item.id === this.$route.params.id
        );
      return undefined;
    },
  },
  watch: {
    searchTerm() {
      this.pipeline();
    },
    filters() {
      this.pipeline();
    },
  },
  beforeMount() {
    const env = { sheetsAPIKey: process.env.sheetsAPIKey };

    if (this.dataStatus == "ok" && this.skills.length == 0)
      this.fetchSpreadsheets({ ...env, areas: this.$knowledgeAreas });
  },
  methods: {
    ...mapActions({
      fetchSpreadsheets: "competencia/fetchSpreadsheets",
      setStrictResults: "global/setStrictResults",
      setFlexibleResults: "global/setFlexibleResults",
    }),
    async fuzzySearch() {
      this.setStrictResults();

      if (!this.search.term.trim()) {
        this.search.skills = undefined;
        return;
      }

      const term = removeAccent(this.search.term.trim());

      let results = await this.$search(
        term,
        this.baseItems,
        genFuzzyOptions(this.searchKeys, 0.0)
      );

      if (results.length === 0) {
        this.setFlexibleResults();
        results = await this.$search(
          term,
          this.baseItems,
          genFuzzyOptions(this.searchKeys)
        );
      }

      this.search.skills = results;
    },
    filterData(context) {
      const campi = context.terciary[0];
      this.unities =
        campi != undefined
          ? this.$campi.find((c) => c.name == campi).unities
          : undefined;

      this.filtered = this.skills.filter((skill) =>
        skill.matchesFilter(context)
      );
    },
    async pipeline() {
      if (this.search.term.trim())
        this.$ga.event({
          eventCategory: "Competências",
          eventAction: "Search",
          eventLabel: this.search.term,
        });
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
    },
    changeSearchTerm(searchTerm) {
      this.search.term = searchTerm;
    },
  },
};
</script>

<style scoped>
.absolute {
  position: absolute;
}
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
