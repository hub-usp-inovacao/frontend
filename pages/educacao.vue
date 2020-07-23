<template>
  <div>
    <div class="background">
      <Panel
        title="Educação"
        description="A USP oferece a seus estudantes diversas disciplinas em nível de graduação e pós-graduação que se relacionam aos temas de Empreendedorismo e Inovação. Ao fazer uma busca, você encontrará as unidades, as condições de oferecimento e códigos e links para acesso às ementas no sistema institucional da Universidade, o Júpiter."
        v-model="search.term"
      />
    </div>

    <Background class="absolute" />

    <MultipleFilters
      :tabs="tabs"
      :groups="groups"
      :colors="{ base: '#db8337', active: '#ab5307' }"
      @select="filterData($event)"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="displayItems">
        <template #content="sProps">
          <p>{{ sProps.item.unity }}</p>
          <p>{{ sProps.item.campus }}</p>
          <p>{{ sProps.item.description.long }}</p>
        </template>
        <template #buttons="sProps">
          <v-btn
            class="white--text"
            color="#db8337"
            :href="sProps.item.url"
            target="_blank"
          >Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="displayItems">
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
import { mapGetters } from "vuex";
import { genFuzzyOptions } from "@/lib";

import Background from "@/components/first_level/Background.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import ListAndDetails from "@/components/first_level/ListAndDetails.vue";
import SelectAndCard from "@/components/first_level/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    ListAndDetails,
    SelectAndCard,
    MultipleFilters,
  },
  data: () => ({
    search: {
      term: "",
      disciplines: undefined,
      keys: ["name", "description.short", "description.long"],
    },

    levels: ["Graduação", "Pós-Graduação"],
    campi: [
      "Lorena",
      "Piracicaba",
      "Pirassununga",
      "Ribeirão Preto",
      "São Carlos",
      "São Paulo",
      "Todos",
      "USP Leste",
    ],
    tabs: [
      {
        name: "Inovação",
        description: "Cursos e disciplinas relacionados à área de Inovação.",
      },
      {
        name: "Empreendedorismo",
        description:
          "Cursos e disciplinas relacionados à área de Empreendedorismo.",
      },
      {
        name: "Propriedade Intelectual",
        description:
          "Cursos e disciplinas relacionados à área de Propriedade Intelectual.",
      },
      {
        name: "Negócios",
        description: "Cursos e disciplinas relacionados à área de Negócios.",
      },
    ],
    filtered: undefined,
  }),
  methods: {
    filterFun(elm, filterStatus) {
      const { primary, terciary } = filterStatus;

      const categories = [];

      if (elm.category.business) categories.push("Negócios");
      if (elm.category.innovation) categories.push("Inovação");
      if (elm.category.entrepreneurship) categories.push("Empreendedorismo");
      if (elm.category.intellectualProperty)
        categories.push("Propriedade Intelectual");

      const primaryMatch =
        primary.length == 0 || categories.some((cat) => primary.includes(cat));

      const [campus, level] = terciary;

      if (campus && elm.campus !== campus) {
        return false;
      }

      if (level && elm.level !== level) {
        return false;
      }

      return primaryMatch;
    },
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.disciplines = undefined;
        return;
      }

      this.search.disciplines = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.search.keys)
      );
    },
    filterData(context) {
      this.filtered = this.disciplines.filter((item) =>
        this.filterFun(item, context)
      );
    },
  },
  watch: {
    searchTerm: debounce(async function () {
      await this.fuzzySearch();
    }, 1250),
  },
  computed: {
    ...mapGetters({
      dataStatus: "educacao/dataStatus",
      storeDisciplines: "educacao/disciplines",
      campi: "educacao/campi",
    }),
    disciplines: function () {
      return this.dataStatus == "ok" ? this.storeDisciplines : [];
    },
    groups() {
      return [
        { label: "Campus", items: this.campi },
        { label: "Nível", items: ["Graduação", "Pós-Graduação"] },
      ];
    },
    searchTerm() {
      return this.search.term;
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.disciplines;
    },
    displayItems() {
      return this.search.disciplines !== undefined
        ? this.search.disciplines
        : this.baseItems;
    },
  },
  beforeMount() {
    const payload = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      sheetID: process.env.sheetID,
    };

    if (this.dataStatus == "ok" && this.disciplines.length == 0)
      this.$store.dispatch("educacao/fetchSpreadsheets", payload);
  },
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
