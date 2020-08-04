<template>
  <div>
    <div class="background">
      <Panel
        title="Iniciativas"
        description="A USP mantém diversas iniciativas e programas para facilitar e estimular a inovação e o empreendedorismo, fazendo a ponte entre o ambiente acadêmico, as organizações e a sociedade. Clique nos links para conhecer os tipos de inicativas e acessar as formas de contatar cada uma delas."
        v-model="search.term"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ base: '#222c63', active: '#525c93' }"
      @select="filters = $event"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="display_entries">
        <template #content="{ item }">
          <p class="body-2">{{ item.unity }}</p>
          <p class="body-2 mb-4">{{ item.local }}</p>
          <p v-for="phone in item.contact.info" :key="phone" class="body-2 mb-4">{{ phone }}</p>
          <p>{{ item.description.long }}</p>
        </template>
        <template #buttons="{ item }">
          <v-btn :href="item.url" color="#222c63" class="white--text" target="_blank">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard group_name="Iniciativas" :items="display_entries">
        <template #item="{ item }">
          <v-container>
            <p class="title">{{item.name}}</p>
            <p class="body-2">{{ item.unity }}</p>
            <p class="body-2 mb-4">{{ item.local }}</p>
            <p
              v-for="phone in item.contact.info"
              :key="phone"
              class="body-2 mb-4"
            >{{ item.contact.info }}</p>
            <p>{{ item.description.long }}</p>
          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn depressed dark color="#222c63" :href="item.url">Saiba Mais</v-btn>
            <v-spacer />
          </v-card-actions>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib/search";

import Background from "@/components/first_level/Background.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import ListAndDetails from "@/components/first_level/ListAndDetails.vue";
import SelectAndCard from "@/components/first_level/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    ListAndDetails,
    SelectAndCard,
    MultipleFilters,
  },
  data: () => ({
    tabs: [
      {
        name: "Agente Institucional",
      },
      {
        name: "Empresa Jr.",
      },
      {
        name: "Entidade Associada",
      },
      {
        name: "Entidade Estudantil",
      },
      {
        name: "Espaço/Coworking",
      },
      {
        name: "Grupos e Iniciativas Estudantis"
      },
      {
        name: "Ideação"
      },
      {
        name: "Incubadora e Parque Tecnológico"
      },
    ],

    search: {
      term: "",
      iniciatives: undefined,
    },

    filters: undefined,
    filtered: undefined,
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "iniciativas/fetchSpreadsheets",
    }),
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.iniciatives = undefined;
        return;
      }

      this.search.iniciatives = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys)
      );
    },
    filterFun(elm, filterStatus) {
      const { primary } = filterStatus;

      if (primary.length == 0) {
        return true;
      }

      return primary.includes(elm.category);
    },
    filterData(context) {
      this.filtered = this.iniciatives.filter((item) =>
        this.filterFun(item, context)
      );
    },
    async pipeline() {
      if (this.filters)
        await this.filterData(this.filters);
      await this.fuzzySearch();
    }
  },
  watch: {
    searchTerm() {
      this.pipeline();
    },
    filters() {
      this.pipeline();
    }
  },
  computed: {
    ...mapGetters({
      iniciatives: "iniciativas/iniciatives",
      dataStatus: "iniciativas/dataStatus",
      searchKeys: "iniciativas/searchKeys",
    }),
    searchTerm() {
      return this.search.term;
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.iniciatives;
    },
    display_entries() {
      return this.search.iniciatives !== undefined
        ? this.search.iniciatives
        : this.baseItems;
    },
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.iniciatives.length == 0) {
      this.fetchSpreadsheets(env);
    }
  },
};
</script>

