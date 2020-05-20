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
    <div>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title class="title font-weight-bold mb-0">Subáreas:</v-card-title>
              <v-container fluid class="d-flex flex-wrap justify-space-between">
                <v-checkbox
                  class="mx-6"
                  v-for="(sub, i) in tabs[current_tab].subareas"
                  :key="i"
                  v-model="selected_subareas"
                  :label="sub.name"
                  :value="sub.name"
                ></v-checkbox>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="hidden-sm-and-down">
      <ListAndCard :items="filtered_entries">
        <template #li="{item}">
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <template #item="{item}">
          <v-card-title px-6>
            <p class="title">{{item.name}}</p>
          </v-card-title>

          <v-card-text px-6>
            <p v-if="item.keywords.length > 0">
              <v-chip class="mx-1" v-for="k in item.keywords" :key="k">{{ k }}</v-chip>
            </p>

            <p class="body-2 mb-2">
              <!--{{ item.phone }} - -->
              {{ item.email }}
            </p>

            <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

            <p v-if="item.descriptions.skills" class="body-1">
              <span class="title font-weight-bold">Competências:</span>
              {{item.descriptions.skills}}
            </p>

            <p v-if="item.descriptions.services" class="body-1">
              <span class="title font-weight-bold">Serviços Tecnológicos:</span>
              {{item.descriptions.services}}
            </p>

            <p v-if="item.descriptions.equipments" class="body-1">
              <span class="title font-weight-bold">Equipamentos:</span>
              {{item.descriptions.equipments}}
            </p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn depressed dark color="primary" :href="item.url">Saiba mais</v-btn>
          </v-card-actions>
        </template>
      </ListAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Select from "../components/Select.vue";
import Background from "../components/Background.vue";
import CardButton from "../components/CardButton.vue";
import ListAndCard from "../components/ListAndCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    Select,
    Background,
    CardButton,
    ListAndCard
  },
  data: () => ({
    search: "",
    unity_list: [],
    loading_search: false,

    item_index: -1,
    current_tab: 0,
    selected_subareas: [],

    entries: [],
    search_entries: [],
    loading_search: false,

    // http://lattes.cnpq.br/web/dgp/arvore-do-conhecimento
    tabs: [
      {
        name: "Ciências Exatas e da Terra",
        description: "",
        subareas: [
          {
            name: "Matemática"
          },
          {
            name: "Probabilidade e Estatística"
          },
          {
            name: "Ciência da Computação"
          }
        ]
      },
      {
        name: "Ciências Biológicas",
        description: "",
        subareas: []
      },
      {
        name: "Educação",
        description: "",
        subareas: []
      },
      {
        name: "Ciências da Saúde",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Agrárias",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Sociais Aplicadas",
        description: "",
        subareas: []
      },
      {
        name: "Ciências Humanas",
        description: "",
        subareas: []
      },
      {
        name: "Linguística, Letras e Artes",
        description: "",
        subareas: []
      },
      {
        name: "Outros",
        description: "",
        subareas: []
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
        this.search_entries = this.entries;
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
          "description",
          "knownledge",
          "skills",
          "group_name",
          "unity",
          "campus",
          "key_words",
          "equipment",
          "services"
        ]
      };

      await this.$search(this.search.trim(), this.entries, options)
        .then(results => {
          this.search_entries = results;
        })
        .finally((this.loading_search = false));
    }
  },
  watch: {
    search: debounce(async function() {
      await this.fuzzySearch();
    }, 500)
  },
  computed: {
    ...mapGetters({
      dataStatus: "competencia/dataStatus",
      skills: "competencia/skills"
    }),
    filtered_entries() {
      const allMinors = this.tabs[this.current_tab].subareas;
      const currentArea = {
        major: this.tabs[this.current_tab].name,
        minors: this.selected_subareas
      };

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
