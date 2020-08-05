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
      @select="filters = $event"
    />

    <DisplayData :items="displayItems" group_name="Disciplinas">
      <template #title="{ item }">{{ item.name }}</template>
      <template #detailsText="{ item }">
        <v-container>
          <p class="body-2">
            <v-chip v-if="item.category.business">Negócios</v-chip>
            <v-chip v-if="item.category.innovation">Inovação</v-chip>
            <v-chip v-if="item.category.intelectual_property">Propriedade Intelectual</v-chip>
            <v-chip v-if="item.category.enterpreneuship">Empreendedorismo</v-chip>
          </p>
          <p class="body-2">{{item.campus}}</p>
          <p class="body-2">{{item.unity}}</p>
        </v-container>
      </template>
      <template #content="{ item }">
        <p>{{ item.description.long }}</p>
      </template>
      <template #actions="{ item }">
        <v-btn
          class="white--text"
          color="#db8337"
          :href="item.url"
          target="_blank"
        >Saiba Mais</v-btn>
      </template>
    </DisplayData>
  </div>
</template>

<script>
import { debounce } from "debounce";
import { mapGetters } from "vuex";
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
      disciplines: undefined,
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
    filters: undefined,
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
        genFuzzyOptions(this.searchKeys)
      );
    },
    filterData(context) {
      this.filtered = this.disciplines.filter((item) =>
        this.filterFun(item, context)
      );
    },
    async pipeline() {
      if (this.filters)
        await this.filterData(this.filters);
      await this.fuzzySearch();
    }
  },
  computed: {
    ...mapGetters({
      dataStatus: "educacao/dataStatus",
      storeDisciplines: "educacao/disciplines",
      campi: "educacao/campi",
      searchKeys: "educacao/searchKeys",
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
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.disciplines;
    },
    displayItems() {
      return this.search.disciplines !== undefined
        ? this.search.disciplines
        : this.baseItems;
    },
    searchTerm() {
      return this.search.term;
    }
  },
  watch: {
    searchTerm() {
      this.pipeline();
    },
    filters() {
      this.pipeline();
    }
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
