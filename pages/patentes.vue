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
      :groups="groups"
      :colors="{ base: '#5B2C7D', active: '#9247C9' }"
      @select="filterData($event)"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="displayItems">
        <template #content="{ item }">
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
import { capitalizeName } from "../lib";

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
    filtered: undefined,
    groups: [
      {
        label: "Status",
        items: ["Concedida", "Em Análise", "Domínio Público"]
      }
    ],
    rawTabs: [
      { name: "Necessidades Humanas", code: "A" },
      { name: "Operações de Processamento; Transporte", code: "B" },
      { name: "Química; Metalurgia", code: "C" },
      { name: "Têxteis; Papel", code: "D" },
      { name: "Construções Fixas", code: "E" },
      {
        name: "Engenharia Mecânica; Iluminação; Aquecimento; Armas; Explosão",
        code: "F"
      },
      { name: "Física", code: "G" }
    ]
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "patentes/fetchSpreadsheets"
    }),
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
    primaryAreaNameToCode(name) {
      return this.tabs.find(t => t.name == name).code;
    },
    filterFun: function(elm, filterStatus) {
      const { primary, secondary, terciary } = filterStatus;

      const primaryCodes = primary.map(this.primaryAreaNameToCode);

      if (primaryCodes.length == 0) {
        return true;
      }

      const primaryMatch =
        primaryCodes.includes(elm.classification.primary.cip.substr(0, 1)) ||
        primaryCodes.includes(elm.classification.secondary.cip.substr(0, 1));

      if (!primaryMatch) {
        return false;
      }

      if (secondary.length == 0 && terciary.length == 0) {
        return true;
      }

      if (secondary.length != 0) {
        const secMatch =
          secondary.includes(elm.classification.primary.subarea) ||
          secondary.includes(elm.classification.secondary.subarea);

        if (!secMatch) {
          return false;
        }
      }

      if (terciary.length != 0) {
        const terMatch = terciary.includes(elm.status);

        if (!terMatch) {
          return false;
        }
      }

      return true;
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
    tabs() {
      return this.rawTabs.map(tab => {
        const subareas = this.patents.reduce((acc, pat) => {
          if (pat.classification.primary.cip.substr(0, 1) == tab.code) {
            acc.add(pat.classification.primary.subarea);
          }

          if (pat.classification.secondary.cip.substr(0, 1) == tab.code) {
            acc.add(pat.classification.secondary.subarea);
          }

          return acc;
        }, new Set());

        return {
          ...tab,
          subareas: Array.from(subareas)
        };
      });
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
