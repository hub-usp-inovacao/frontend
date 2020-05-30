<template>
  <div style="min-height: 100vh;">
    <div class="background">
      <Panel
        title="Competências"
        description="Nesta seção, você pode consultar quais as competências dos pesquisadores da USP, quem são e como contatá-los. O Portal Solus utiliza como parâmetro de divisão de competências a Tabela das Áreas do Conhecimento apresentada pelo CNPq, e divide-as em dois níveis principais correspondentes, respectivamente, à área do conhecimento (ex.: Ciências Exatas e da Terra) e sua sub-área (ex.: Matemática)."
        url="https://forms.gle/dDooKL5G2sApfjqb6"
        @input="search = $event"
      />

      <!-- Seleção de Área -->

      <CardButton :tabs="tabs" color="#6b1c28" active="#6a0515" @tab="updateTab($event)">
        <template #card="{item}">
          <v-container fill-height>
            <v-row class="align-center justify-center ma-0">
              <p class="white--text subtitle-1 font-weight-medium text-center mb-0">{{item.name}}</p>
            </v-row>
          </v-container>
        </template>
      </CardButton>
    </div>

    <Background class="absolute" />

    <!-- Seleção de Subárea -->
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
                  v-for="sub of selectedTab.subareas"
                  :key="sub"
                  :value="sub"
                >{{ sub }}</v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered_entries">
        <template #content="sProps">
          <p class="body-2 mb-2">{{ sProps.item.email }}</p>
          <p class="body-2 mb-2">{{ sProps.item.unity }}</p>
          <p class="body-2 mb-2">{{ sProps.item.campus }}</p>

          <v-expansion-panels>
            <v-expansion-panel v-for="desc in itemDescriptions" :key="desc.key">
              <v-expansion-panel-header class="font-weight-bold">{{ desc.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <v-list-item-group>
                    <v-list-item
                      v-for="description in sProps.item.descriptions[desc.key]"
                      :key="description"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="'mdi-circle-small'"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ description }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <!-- <p
                  v-for="description in sProps.item.descriptions[desc.key]"
                  :key="description"
                >{{ description }}</p>-->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <template #buttons="sProps">
          <v-btn
            class="white--text"
            color="#6b1c28"
            target="_blank"
            :href="sProps.item.url"
          >saiba mais</v-btn>
          <v-btn
            class="white--text"
            color="#6b1c28"
            target="_blank"
            :disabled="!sProps.item.lattes"
            :href="sProps.item.lattes"
          >lattes</v-btn>
        </template>
      </ListAndDetails>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Select from "../components/Select.vue";
import Background from "../components/Background.vue";
import CardButton from "../components/CardButton.vue";
import ListAndDetails from "../components/ListAndDetails.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Select,
    Background,
    CardButton,
    ListAndDetails
  },
  data: () => ({
    search: "",
    loading_search: false,

    item_index: -1,
    current_tab: 0,
    selected_subareas: [],

    entries: [],
    searched_skills: undefined,
    loading_search: false,

    itemDescriptions: [
      { key: "skills", title: "Competências" },
      { key: "services", title: "Serviços Tecnológicos" },
      { key: "equipments", title: "Equipamentos" }
    ],

    // http://lattes.cnpq.br/documents/11871/24930/TabeladeAreasdoConhecimento.pdf/d192ff6b-3e0a-4074-a74d-c280521bd5f7
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
          "Ciência e Tecnologia de Alimentos"
        ]
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
          "Parasitologia"
        ]
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
          "Educação Física"
        ]
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
          "Oceanografia"
        ]
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
          "Engenharia Biomédica"
        ]
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
          "Teologia"
        ]
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
          "Turismo"
        ]
      },
      {
        name: "Linguística, Letras e Artes",
        description: "",
        subareas: ["Linguística", "Letras", "Artes"]
      }
    ]
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "competencia/fetchSpreadsheets"
    }),
    updateTab(t) {
      this.current_tab = t;
      this.selected_subareas = [];
    },
    async fuzzySearch() {
      if (!this.search.trim()) {
        this.searched_skills = undefined;
        return;
      }
      this.loading_search = true;
      this.item_index = -1;

      var options = {
        tokenize: true,
        shouldSort: false,
        matchAllTokens: true,
        threshold: 0.2,
        location: 0,
        distance: 200,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          "name",
          "categories",
          "groupName",
          "groupInitials",
          "descriptions.skills",
          "descriptions.services",
          "descriptions.equipments",
          "area.major",
          "area.minor",
          "keywords"
        ]
      };

      this.$search(this.search.trim(), this.skills, options)
        .then(results => {
          this.searched_skills = results.length > 0 ? results : undefined;
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
      dataStatus: "competencia/dataStatus",
      skills: "competencia/skills"
    }),
    selectedTab() {
      return this.tabs[this.current_tab];
    },
    filtered_entries() {
      const allMinors = this.tabs[this.current_tab].subareas;
      const currentArea = {
        major: this.tabs[this.current_tab].name,
        minors: this.selected_subareas
      };

      if (this.searched_skills !== undefined) {
        return this.searched_skills;
      }

      return this.skills
        .filter(skill => {
          if (skill.area.major != currentArea.major) {
            return false;
          }

          // potencialmente isso vai embora porque toda área deve ter subárea
          if (allMinors.length == 0) {
            return true;
          }

          return skill.area.minors.reduce(
            (acc, skillMinor) => acc || currentArea.minors.includes(skillMinor),
            false
          );
        })
        .sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.skills.length == 0)
      this.fetchSpreadsheets(env);
  }
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
