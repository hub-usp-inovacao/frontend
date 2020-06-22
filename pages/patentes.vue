<template>
  <div>
    <div class="background">
      <Panel
        title="Patentes"
        description="Pesquisadores e unidades da USP desenvolvem patentes e propriedade industrial que estão disponíveis para que empresas e organizações possam licenciar para aplicação e uso. Usando palavras-chave na caixa de busca você terá acesso a breves descrições destas patentes e formas de contato para obter maior detalhamento e informações sobre cada uma delas."
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#64318A" active="#2C163D" @tab="updateTab($event)">
        <template #card="{item}">
          <v-container fill-height>
            <v-row class="align-center justify-center ma-0">
              <p class="white--text subtitle-1 font-weight-medium text-center mb-0">{{item.name}}</p>
            </v-row>
          </v-container>
        </template>
      </CardButton>

      <v-container>
        <v-row>
          <v-col offset="1" cols="10">
            <v-card>
              <v-card-title class="title font-weight-bold mb-0">Subáreas:</v-card-title>
              <v-card-subtitle>você pode fazer múltiplas seleções</v-card-subtitle>
              <v-card-text class="d-flex flex-wrap justify-center">
                <v-chip-group v-model="selected_subareas" multiple :column="true">
                  <v-chip
                    outlined
                    filter
                    v-for="sub of subareas"
                    :key="sub"
                    :value="sub"
                  >{{ sub.length > 20 ? sub.slice(0, 20) + "..." : sub }}</v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered_entries">
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
      <SelectAndCard :items="filtered_entries.map(e => ({ ...e, description: { long: '' }}))">
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
import CardButton from "../components/CardButton.vue";
import ListAndDetails from "../components/ListAndDetails.vue";
import SelectAndCard from "../components/SelectAndCard.vue";
import Select from "../components/Select.vue";
import BulletList from "../components/BulletList.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Background,
    CardButton,
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

    entries: [],
    tabs: [
      {
        name: "Necessidades Humanas",
        description: "",
        entries: []
      },
      {
        name: "Operações de Processamento e Transporte",
        description: "",
        entries: []
      },
      {
        name: "Química e Metalurgia",
        description: "",
        entries: []
      },
      {
        name: "Têxteis",
        description: "",
        entries: []
      },
      {
        name: "Construções Fixas",
        description: "",
        entries: []
      },
      {
        name: "Engenharia Mecânica",
        description: "",
        entries: []
      },
      {
        name: "Física",
        description: "",
        entries: []
      }
    ],
    selected_subareas: [],
    searched_patents: undefined
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
    filtered_entries: function() {
      const selectedArea = this.areas[this.current_tab];

      let base =
        this.searched_patents !== undefined
          ? this.searched_patents
          : this.patents;

      return base.filter(patent => {
        const primary = patent.classification.primary;

        const sameArea = primary.cip === selectedArea;
        const sameSubarea =
          this.selected_subareas !== []
            ? this.selected_subareas.includes(primary.subareas)
            : true;

        return sameArea && sameSubarea;
      });
    },
    areas: function() {
      return Array.from(
        this.patents.reduce(
          (areaSet, patent) =>
            areaSet.add(patent.classification.primary.cip.trim()),
          new Set()
        )
      )
        .filter(area => area != "")
        .sort((a, b) => a.localeCompare(b));
    },
    subareas: function() {
      let areas = ["A", "B", "C", "D", "E", "F", "G"];
      return Array.from(
        this.patents.reduce(
          (subareaSet, patent) =>
            subareaSet.add(patent.classification.primary.subareas.trim()),
          new Set()
        )
      )
        .filter(subarea => subarea[0] === areas[this.current_tab][0])
        .sort((a, b) => a.localeCompare(b));
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
