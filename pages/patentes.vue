<template>
  <div>
    <div class="background">
      <Panel
        title="Patentes"
        description="Pesquisadores e unidades da USP desenvolvem patentes e propriedade industrial que estão disponíveis para que empresas e organizações possam licenciar para aplicação e uso. Usando palavras-chave na caixa de busca você terá acesso a breves descrições destas patentes e formas de contato para obter maior detalhamento e informações sobre cada uma delas."
        v-model="search.term"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ base: '#5B2C7D', active: '#9247C9' }"
      @select="filterData($event)"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="displayItems">
        <template #content="{ item }">
          <p>{{ item.classification.primary.cip }}</p>
          <p>{{ item.classification.primary.subareas }}</p>
          <p v-for="sub of getSecondarySubarea(item)">{{ sub }}</p>

          <BulletList
            v-if="item.ipcs.length > 0 && item.ipcs[0] != ''"
            title="IPCs"
            :items="item.ipcs"
          />
          <BulletList title="Titulares" :items="item.owners" />
          <BulletList title="Inventores" :items="item.inventors" />
          <BulletList title="Países com Proteção" :items="item.countriesWithProtection" />

          <p>{{ item.sumary }}</p>
        </template>

        <template #buttons="{ item }">
          <v-btn color="#64318A" :href="item.url" class="white--text">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="displayItems.map(e => ({ ...e, description: { long: '' }}))">
        <template #item="{ item }">
          <v-container>
            <p>{{ item.classification.primary.cip }}</p>
            <p>{{ item.classification.primary.subareas }}</p>

            <BulletList
              v-if="item.ipcs.length > 0 && item.ipcs[0] != ''"
              title="IPCs"
              :items="item.ipcs"
            />
            <BulletList title="Titulares" :items="item.owners" />
            <BulletList title="Inventores" :items="item.inventors" />
            <BulletList title="Países com Proteção" :items="item.countriesWithProtection" />

            <p>{{ item.sumary }}</p>

            <v-card-actions>
              <v-spacer />
              <v-btn depressed dark color="#64318A" :href="item.url">Saiba Mais</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-container>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Background from "../components/Background.vue";
import MultipleFilters from "../components/MultipleFilters.vue";
import ListAndDetails from "../components/ListAndDetails.vue";
import SelectAndCard from "../components/SelectAndCard.vue";
import Select from "../components/Select.vue";
import BulletList from "../components/BulletList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Background,
    MultipleFilters,
    ListAndDetails,
    SelectAndCard,
    Select,
    BulletList
  },
  data: () => ({
    search: {
      term: "",
      patents: undefined,
      keys: [
        "name",
        "summary",
        "classification.primary.cip",
        "classification.primary.subarea",
        "classification.secondary.cip",
        "classification.secondary.subarea",
        "owners",
        "inventors"
      ]
    },

    selected_subareas: [],
    filtered: undefined
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "patentes/fetchSpreadsheets"
    }),
    getSecondarySubarea(patent) {
      let subareaCode = patent.classification.secondary.subareas.slice(0,3);

      if (!subareaCode) {
        return [];
      }

      let subareaList = this.subareas.filter(subarea => 
        subarea.includes(subareaCode));

      return subareaList.length > 0 ? subareaList : [];
    },
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        return;
      }

      const options = {
        ignoreLocation: true,
        findAllMatches: true,
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        threshold: 0.4,
        keys: this.search.keys
      };

      const results = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        options
      );
      this.search.patents = results.length > 0 ? results : undefined;
    },
    filterFun: (elm, filterStatus) => {
      const { primary, secondary } = filterStatus;

      if (primary.length == 0) {
        return true;
      }

      const { cip, subareas } = elm.classification.primary;

      const primaryMatch = primary.some(area => cip.includes(area));

      if (!primaryMatch) {
        return false;
      }

      if (secondary.length == 0) {
        return true;
      }

      return secondary.some(sub =>
        subareas.includes(sub.length > 20 ? sub.slice(0, sub.length - 3) : sub)
      );
    },
    removeCode(name) {
      name = name.slice(1);
      for (let c of name) {
        if (("A" <= c && c <= "Z") || ("a" <= c && c <= "z")) {
          return name.slice(name.indexOf(c));
        }
      }
    },
    filterData(context) {
      this.filtered = this.patents.filter(item =>
        this.filterFun(item, context)
      );
    }
  },
  watch: {
    searchTerm: debounce(async function() {
      await this.fuzzySearch();
    }, 250)
  },
  computed: {
    ...mapGetters({
      dataStatus: "patentes/dataStatus",
      patents: "patentes/patents"
    }),
    searchTerm() {
      return this.search.term;
    },
    areas: function() {
      return Array.from(
        this.patents.reduce(
          (areaSet, patent) => areaSet.add(patent.classification.primary.cip),
          new Set()
        )
      )
        .filter(area => area != "")
        .sort((a, b) => a.localeCompare(b));
    },
    subareas: function() {
      return Array.from(
        this.patents
          .map(patent => patent.classification.primary.subareas)
          .reduce((subareaSet, subarea) => subareaSet.add(subarea), new Set())
      ).sort((a, b) => a.localeCompare(b));
    },
    tabs: function() {
      return this.areas.map(area => ({
        name: this.removeCode(area),
        subareas: this.subareas
          .filter(subarea => area[0] == subarea[0])
          .map(sub => (sub.length > 4 ? this.removeCode(sub) : sub))
          .map(sub => (sub.length > 20 ? sub.slice(0, 20) + "..." : sub))
      }));
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.patents;
    },
    displayItems() {
      return this.search.patents !== undefined
        ? this.search.patents
        : this.baseItems;
    }
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.patents.length == 0) {
      this.fetchSpreadsheets(env);
    }
  }
};
</script>
