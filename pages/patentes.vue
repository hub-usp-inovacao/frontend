<template>
  <div>
    <div class="background">
      <Panel
        title="Patentes"
        description="Pesquisadores e unidades da USP desenvolvem patentes e propriedade industrial que estão disponíveis para que empresas e organizações possam licenciar para aplicação e uso. Usando palavras-chave na caixa de busca você terá acesso a breves descrições destas patentes e formas de contato para obter maior detalhamento e informações sobre cada uma delas."
        @input="search = $event"
      />
    </div>

    <MultipleFilters
      :items="patents"
      :tabs="tabs"
      :filterFun="filterFun"
      @filtered="filtered = $event"
    />

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered">
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
      <SelectAndCard :items="filtered.map(e => ({ ...e, description: { long: '' }}))">
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
    search: "",
    current_tab: 0,

    sheet_name: "",
    sheet_id: "",
    api_key: "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY",

    selected_subareas: [],
    searched_patents: undefined,
    filtered: []
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "patentes/fetchSpreadsheets"
    }),
    updateTab(t) {
      this.current_tab = t;
      this.selected_subareas = [];
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
        this.searched_patents = undefined;
        return;
      }
      this.loading_search = true;
      this.item_index = -1;

      var options = {
        tokenize: true,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "name",
          "classification.primary.cip",
          "classification.primary.subarea",
          "owners",
          "inventors",
          "summary"
        ]
      };

      this.$search(this.search.trim(), this.patents, options)
        .then(results => {
          this.searched_patents = results.length > 0 ? results : undefined;
        })
        .finally((this.loading_search = false));
    },
    compare_string(a, b) {
      return a.localeCompare(b);
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

      return secondary.some(
        sub => subareas.includes(
          sub.length > 20 ? sub.slice(0, sub.length - 3) : sub)
      );
    },
    removeCode(name) {
      for (let c of name.slice(1)) {
        if ('A' <= c && c <= 'Z' || 'a' <= c && c <= 'z') {
          return name.slice(name.indexOf(c));
        }
      }
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500),
    current_tab: debounce(async function() {
      await this.fuzzySearch();
    }, 500)
  },
  computed: {
    ...mapGetters({
      dataStatus: "patentes/dataStatus",
      patents: "patentes/patents"
    }),
    areas: function() {
      return Array.from(
        this.patents.reduce(
          (areaSet, patent) =>
            areaSet.add(patent.classification.primary.cip),
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
          .reduce(
            (subareaSet, subarea) =>
              subareaSet.add(subarea),
            new Set()
          )
      )
        .sort((a, b) => a.localeCompare(b));
    },
    tabs: function(){
      return this.areas.map(
        (area) => ({
          name: this.removeCode(area),
          subareas: this.subareas.filter(subarea => area[0] == subarea[0])
            .map(sub => sub.length > 20 ? sub.slice(0,20) + "..." : sub)
        })
      );
    }
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.patents.length == 0)
      this.fetchSpreadsheets(env);
  }
};
</script>
