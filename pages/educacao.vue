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
import { mapGetters } from "vuex";

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

    searched_disciplines: undefined,

    curr: {
      tab: 0,
      campus: undefined,
      level: undefined
    }
  }),
  methods: {
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
          this.searched_disciplines = results.length > 0 ? results : undefined;
        })
        .finally((this.loading_search = false));
    },
    updateCampus(new_campus) {
      this.curr.campus = new_campus;
    },
    updateLevel(new_level) {
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
    ...mapGetters({
      dataStatus: "educacao/dataStatus",
      storeDisciplines: "educacao/disciplines",
      campi: "educacao/campi"
    }),
    disciplines: function() {
      return this.dataStatus == "ok" ? this.storeDisciplines : [];
    },
    campi_list: function() {
      return this.dataStatus == "ok" ? this.campi : [];
    },
    filtered_entries: function() {
      const { tab, campus, level } = this.curr;

      const tabCategory = [
        "innovation",
        "entrepreneurship",
        "intellectualProperty",
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
    const payload = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID
    };

    if (this.dataStatus == "ok" && this.disciplines.length == 0)
      this.$store.dispatch("educacao/fetchSpreadsheets", payload);
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
