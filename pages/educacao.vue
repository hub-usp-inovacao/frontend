<template>
  <div>
    <div class="background">
      <Panel
        title="Educação"
        description="A USP oferece a seus estudantes diversas disciplinas em nível de graduação e pós-graduação que se relacionam aos temas de Empreendedorismo e Inovação. Ao fazer uma busca, você encontrará as unidades, as condições de oferecimento e códigos e links para acesso às ementas no sistema institucional da Universidade, o Júpiter."
        url="https://forms.gle/tAuVq5oAYiGo52u46"
        @input="search = $event"
      />

      <CardButton :tabs="tabs" color="#db8337" active="#bf6213" @tab="updateTab($event)" />

      <v-container>
        <v-row class="ma-0">
          <v-col>
            <p class="font-weight-medium">Filtros:</p>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="6" sm="4" md="3">
            <Select :items="campi_list" label="Campi" @select="updateCampus" />
          </v-col>
          <v-col cols="6" sm="4" md="3">
            <Select :items="levels" label="Categoria" @select="updateLevel" />
          </v-col>
        </v-row>
      </v-container>
    </div>

    <Background class="absolute" />

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
            <p class="body-2 mb-2">
              <v-chip v-if="item.category.business">Negócios</v-chip>
              <v-chip v-if="item.category.innovation">Inovação</v-chip>
              <v-chip v-if="item.category.intelectual_property">Propriedade Intelectual</v-chip>
              <v-chip v-if="item.category.enterpreneuship">Empreendedorismo</v-chip>
            </p>

            <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

            <p class="body-1">{{item.description.long}}</p>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn depressed dark color="primary" :href="item.url">Saiba mais</v-btn>
          </v-card-actions>
        </template>
      </ListAndCard>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="filtered_entries">
        <template #item="{item}">
          <v-container px-6>
            <p class="title">{{item.name}}</p>
            <p class="body-2 my-2">
              <v-chip v-if="item.category.business">Negócios</v-chip>
              <v-chip v-if="item.category.innovation">Inovação</v-chip>
              <v-chip v-if="item.category.intelectual_property">Propriedade Intelectual</v-chip>
              <v-chip v-if="item.category.enterpreneuship">Empreendedorismo</v-chip>
            </p>
            <p class="body-2">{{item.campus}} - {{item.unity}}</p>
          </v-container>

          <v-container px-6>
            <p class="body-1">{{item.description.long}}</p>
          </v-container>

          <v-card-actions>
            <v-spacer />
            <v-btn depressed dark color="rgb(255, 167, 38)" :href="item.url">Saiba mais</v-btn>
            <v-spacer />
          </v-card-actions>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Panel from "../components/Panel.vue";
import Background from "../components/Background.vue";
import Select from "../components/Select.vue";
import CardButton from "../components/CardButton.vue";
import ListAndCard from "../components/ListAndCard.vue";
import SelectAndCard from "../components/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    Select,
    CardButton,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    sheet_name: "DISCIPLINAS",
    sheet_id: process.env.sheetID,
    api_key: process.env.sheetsAPIKey,

    search: "",

    levels: ["Graduação", "Pós-Graduação"],
    tabs: [
      {
        name: "Inovação",
        description: "Cursos e disciplinas relacionados à área de Inovação."
      },
      {
        name: "Empreendedorismo",
        description:
          "Cursos e disciplinas relacionados à área de Empreendedorismo."
      },
      {
        name: "Propriedade Intelectual",
        description:
          "Cursos e disciplinas relacionados à área de Propriedade Intelectual."
      },
      {
        name: "Negócios",
        description: "Cursos e disciplinas relacionados à área de Negócios."
      }
    ],

    disciplines: [],
    campi_list: [],
    searched_disciplines: undefined,

    curr: {
      tab: 0,
      campus: undefined,
      level: undefined
    }
  }),
  methods: {
    async sheetQuery() {
      this.loading_data = true;
      const campi = new Set();

      fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.sheet_id}/values/'${this.sheet_name}'?key=${this.api_key}`
      )
        .then(request => request.json())
        .then(data => {
          data.values.slice(1).forEach(row => {
            let di = {
              name: row[0], // 0
              description: {
                // short: row[3],
                short: row[4],
                // long: row[8]
                long: row[5]
              },
              // campus: row[4],
              campus: row[1],
              // unity: row[5],
              unity: row[2],
              // category: row[6], // múltiplas opções
              category: {
                business: row[8].length > 0,
                enterpreneuship: row[9].length > 0,
                innovation: row[10].length > 0,
                intelectual_property: row[11].length > 0
              },
              // url: row[7],
              url: row[3],
              // area: row[9], // perdido "depto/prog ou área de concentração"
              area: "dado perdido",
              // start_date: row[10],
              start_date: row[6],
              level: row[12] // Graduação ou Pós-Graduação
            };

            campi.add(di.campus);
            this.disciplines.push(di);
          });
        })
        .finally(() => {
          this.loading_data = false;
          this.campi_list = Array.from(campi).sort(this.compare_string);
        });
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
        keys: ["title", "campus", "description.long", "unity"]
      };

      this.$search(this.search.trim(), this.disciplines, options)
        .then(results => {
          this.searched_disciplines = results;
        })
        .finally((this.loading_search = false));
    },
    compare_string(a, b) {
      return a.localeCompare(b);
    },
    updateCampus(new_campus) {
      this.curr.campus = new_campus;
    },
    updateLevel(new_level) {
      console.log(new_level);
      this.curr.level = new_level;
    },
    updateTab(t) {
      this.curr.tab = t;
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
    filtered_entries: function() {
      const { tab, campus, level } = this.curr;

      const tabCategory = [
        "innovation",
        "enterpreneuship",
        "intelectual_property",
        "business"
      ];

      const selectedCategory = tabCategory[tab];

      const base =
        this.searched_disciplines !== undefined
          ? this.searched_disciplines
          : this.disciplines;

      return base.filter(disc => {
        const sameCategory = disc.category[selectedCategory];

        const sameCampus =
          campus !== undefined
            ? campus === "Todos" || disc.campus === campus
            : true;

        const sameLevel = level !== undefined ? disc.level === level : true;

        return sameCategory && sameCampus && sameLevel;
      });
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
.left-border {
  border-radius: 5px 0 0 5px;
}
.right-border {
  border-radius: 0 5px 5px 0;
}
</style>
