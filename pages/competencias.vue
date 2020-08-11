<template>
  <div style="min-height: 100vh;">
    <div class="background">
      <Panel
        v-model="search.term"
        title="Competências"
        description="Nesta seção, você pode consultar quais as competências dos pesquisadores da USP, quem são e como contatá-los. O Portal Solus utiliza como parâmetro de divisão de competências a Tabela das Áreas do Conhecimento apresentada pelo CNPq, e divide-as em dois níveis principais correspondentes, respectivamente, à área do conhecimento (ex.: Ciências Exatas e da Terra) e sua sub-área (ex.: Matemática)."
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :colors="{ active: '#9b4c68', base: '#6b1c28' }"
      @select="filters = $event"
    />

    <DisplayData :items="displayItems" group-name="Competências">
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <v-container>
          <v-row>
            <v-col>
              <p>{{ item.email }}</p>
            </v-col>
          </v-row>
          <v-row v-if="item.phone">
            <v-col>
              <p>{{ item.phone }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>{{ item.unity }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <p>{{ item.campus }}</p>
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
            <v-expansion-panel-header class="font-weight-bold">{{
              desc.title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item-group>
                  <v-list-item
                    v-for="description in item.descriptions[desc.key]"
                    :key="description"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="'mdi-circle-small'"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <p>{{ description }}</p>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
      <template #actions="{ item }">
        <v-btn
          class="white--text"
          color="#6b1c28"
          target="_blank"
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
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib/search";

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

    tabs: [
      {
        name: "Ciências Agrárias",
        description: "",
        subareas: [
          "Agronomia",
          "Recursos Florestais e Engenharia Florestal",
          "Engenharia Agrícola",
          "Zootecnia",
          "Medicina Veterinária",
          "Recursos Pesqueiros e Engenharia de Pesca",
          "Ciência e Tecnologia de Alimentos",
        ],
      },
      {
        name: "Ciências Biológicas",
        description: "",
        subareas: [
          "Biologia Geral",
          "Genética",
          "Botânica",
          "Zoologia",
          "Ecologia",
          "Morfologia",
          "Fisiologia",
          "Bioquímica",
          "Biofísica",
          "Farmacologia",
          "Imunologia",
          "Microbiologia",
          "Parasitologia",
        ],
      },
      {
        name: "Ciências da Saúde",
        description: "",
        subareas: [
          "Medicina",
          "Odontologia",
          "Farmácia",
          "Enfermagem",
          "Nutrição",
          "Saúde Coletiva",
          "Fonoaudiologia",
          "Fisioterapia e Terapia Ocupacional",
          "Educação Física",
        ],
      },
      {
        name: "Ciências Exatas e da Terra",
        description: "",
        subareas: [
          "Matemática",
          "Probabilidade e Estatística",
          "Ciência da Computação",
          "Astronomia",
          "Física",
          "Química",
          "GeoCiências",
          "Oceanografia",
        ],
      },
      {
        name: "Engenharias",
        description: "",
        subareas: [
          "Engenharia Civil",
          "Engenharia de Minas",
          "Engenharia de Materiais e Metalúrgica",
          "Engenharia Elétrica",
          "Engenharia Mecânica",
          "Engenharia Química",
          "Engenharia Sanitária",
          "Engenharia de Produção",
          "Engenharia Nuclear",
          "Engenharia de Transportes",
          "Engenharia Naval e Oceânica",
          "Engenharia Aeroespacial",
          "Engenharia Biomédica",
        ],
      },
      {
        name: "Ciências Humanas",
        description: "",
        subareas: [
          "Filosofia",
          "Sociologia",
          "Antropologia",
          "Arqueologia",
          "História",
          "Geografia",
          "Psicologia",
          "Educação",
          "Ciência Política",
          "Teologia",
        ],
      },
      {
        name: "Ciências Sociais Aplicadas",
        description: "",
        subareas: [
          "Direito",
          "Administração",
          "Economia",
          "Arquitetura e Urbanismo",
          "Planejamento Urbano e Regional",
          "Demografia",
          "Ciência da Informação",
          "Museologia",
          "Comunicação",
          "Serviço Social",
          "Economia Doméstica",
          "Desenho Industrial",
          "Turismo",
        ],
      },
      {
        name: "Linguística, Letras e Artes",
        description: "",
        subareas: ["Linguística", "Letras", "Artes"],
      },
    ],
  }),
  computed: {
    ...mapGetters({
      dataStatus: "competencia/dataStatus",
      skills: "competencia/skills",
      searchKeys: "competencia/searchKeys",
    }),
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.skills;
    },
    displayItems() {
      return this.search.skills !== undefined
        ? this.search.skills
        : this.baseItems;
    },
    searchTerm() {
      return this.search.term;
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
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.skills.length == 0)
      this.fetchSpreadsheets(env);
  },
  methods: {
    filterFun: (elm, filterStatus) => {
      const { primary, secondary } = filterStatus;

      if (primary.length == 0) {
        return true;
      }

      const primaryMatch = primary.includes(elm.area.major);

      if (!primaryMatch) {
        return false;
      }

      if (secondary.length == 0) {
        return true;
      }

      return elm.area.minors.some((minor) => secondary.includes(minor));
    },
    ...mapActions({
      fetchSpreadsheets: "competencia/fetchSpreadsheets",
    }),
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.skills = undefined;
        return;
      }

      this.search.skills = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys)
      );
    },
    filterData(context) {
      this.filtered = this.skills.filter((item) =>
        this.filterFun(item, context)
      );
    },
    async pipeline() {
      if (this.filters) await this.filterData(this.filters);
      await this.fuzzySearch();
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
