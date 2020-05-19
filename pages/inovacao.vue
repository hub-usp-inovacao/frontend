<template>
  <div>
    <div class="background">
      <Panel
        title="P&amp;D&amp;I"
        description="Na seção de Pesquisa &amp; Desenvolvimento &amp; Inovação, você encontra laboratórios, organizações e programas que atuam com desenvolvimento e inovação no âmbito da USP. Aqui, você pode consultar informações e contatos de CEPIDs, EMBRAPIIs, INCTs e NAPs, de acordo com as áreas de competência e serviços realizados."
        url="https://forms.gle/3z4Vn3ewgP6UKJey6"
        :loading="loading_search"
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#005C59" active="#003836" @tab="updateTab($event)" />
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndCard :items="filtered_entries">
        <template #item="{item}">
          <v-card-title px-6>
            <p class="title">{{item.name}}</p>
          </v-card-title>

          <v-card-text px-6>
            <p v-if="item.knowledge.length > 0" class="body-2">
              <v-chip class="mx-1" v-for="k of item.knowledge" :key="k">{{ k }}</v-chip>
            </p>

            <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

            <p class="body-2">{{item.description.long}}</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn depressed dark color="tertiary" :href="item.url" :target="'_blank'">Saiba mais</v-btn>
          </v-card-actions>
        </template>
      </ListAndCard>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="filtered_entries" />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "@/components/Panel.vue";
import Select from "@/components/Select.vue";
import Background from "@/components/Background.vue";
import CardButton from "@/components/CardButton.vue";
import ListAndCard from "@/components/ListAndCard.vue";
import SelectAndCard from "@/components/SelectAndCard.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Select,
    Background,
    CardButton,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    search: "",
    loading_search: false,

    current_tab: 0,

    entries: [],
    tabs: [
      {
        name: "CEPIDs",
        description:
          "São Centros de Pesquisa, Inovação e Difusão, apoiados pela FAPESP que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante. ",
        entries: []
      },
      {
        name: "EMBRAPIIs",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial apoia instituições de pesquisa técnológica para que execultem projetos de desenvolvimento e inovação em cooperação com empresas do setor industrial.",
        entries: []
      },
      {
        name: "INCTs",
        description:
          "Os Institutos Nacionais de Ciência e Técnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
        entries: []
      },
      {
        name: "NAPs",
        description:
          "São os Núcleos de Apoio à Pesquisa, órgãos de integração da USP que promovem a reunião entre especialistas de uma ou mais Unidades USP em torno de programas de pesquisas de caráter interdisciplinar e/ou de apoio instrumental à pesquisa.",
        entries: []
      },
      {
        name: "Centrais Multiusuários",
        description: "",
        entries: []
      },
      {
        name: "Serviços Tecnológicos",
        description: "",
        entries: []
      }
    ]
  }),
  methods: {
    updateTab(t) {
      this.current_tab = t;
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
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
        keys: ["name", "campus", "description.long", "unity"]
      };

      this.$search(this.search.trim(), this.pdis, options)
        .then(results => {
          this.searched_pdis = results.length > 0 ? results : undefined;
        })
        .finally((this.loading_search = false));
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500),
    current_tab: async function() {
      await this.fuzzySearch();
    }
  },
  computed: {
    ...mapGetters({
      dataStatus: "pdi/dataStatus",
      storePDIs: "pdi/pdis"
    }),
    pdis: function() {
      return this.dataStatus == "ok" ? this.storePDIs : [];
    },
    filtered_entries: function() {
      const tab = this.current_tab;

      const tabCategory = [
        "CEPID",
        "EMBRAPII",
        "INCT",
        "NAP",
        "Centrais multiusuários",
        "Serviços tecnológicos"
      ];

      const selectedCategory = tabCategory[tab];

      const base =
        this.searched_pdis !== undefined ? this.searched_pdis : this.pdis;

      return base.filter(pdi => pdi.category == selectedCategory);
    }
  },
  beforeMount() {
    const payload = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.pdis.length == 0)
      this.$store.dispatch("pdi/fetchSpreadsheets", payload);
  }
};
</script>

<style scoped>
</style>