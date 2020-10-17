<template>
  <div>
    <!-- Land -->
    <Banner @search="submitSearch" />

    <!-- Um lugar só com... -->
    <InfoSolusBulletList />

    <!-- USP: Um lugar para empreender... -->
    <InfoUSP />

    <!-- Solus: Encontre o que voce... -->
    <InfoSolusGif />

    <!-- DNA USP -->
    <InfoDNAUSP />

    <!-- AUSPIN -->
    <InfoAuspin />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Banner from "@/components/first_level/home/Banner.vue";
import InfoSolusBulletList from "@/components/first_level/home/InfoSolusBulletList.vue";
import InfoUSP from "@/components/first_level/home/InfoUSP.vue";
import InfoSolusGif from "@/components/first_level/home/InfoSolusGif.vue";
import InfoDNAUSP from "@/components/first_level/home/InfoDNAUSP.vue";
import InfoAuspin from "@/components/first_level/home/InfoAuspin.vue";

export default {
  components: {
    Banner,
    InfoSolusBulletList,
    InfoUSP,
    InfoSolusGif,
    InfoDNAUSP,
    InfoAuspin,
  },
  computed: {
    ...mapGetters({
      eduStatus: "educacao/dataStatus",
      pdiStatus: "pdi/dataStatus",
      skillsStatus: "competencia/dataStatus",
      iniciativesStatus: "iniciativas/dataStatus",
      patentsStatus: "patentes/dataStatus",
      companiesStatus: "empresas/dataStatus",

      disciplines: "educacao/disciplines",
      pdis: "pdi/pdis",
      skills: "competencia/skills",
      iniciatives: "iniciativas/iniciatives",
      patents: "patentes/patents",
      companies: "empresas/companies",

      IniciativasSheetID: "global/IniciativasSheetID",
      CompetênciasSheetID: "global/CompetênciasSheetID",
      EmpresasSheetID: "global/EmpresasSheetID",
      PatentesSheetID: "global/PatentesSheetID",
    }),
  },
  async beforeMount() {
    const env = {
      sheetsAPIKey: process.env.sheetsAPIKey,
      metaSheetID: process.env.metaSheetID,
      sheetID: process.env.sheetID,
    };
    await this.fetchSpreadsheetsID(env);

    if (this.eduStatus == "ok" && this.disciplines.length == 0) {
      this.fetchDisciplines(env);
    }

    if (this.pdiStatus == "ok" && this.pdis.length == 0) {
      this.fetchPDIs(env);
    }

    if (this.skillsStatus == "ok" && this.skills.length == 0) {
      await this.fetchSkills({
        sheetsAPIKey: env.sheetsAPIKey,
        sheetID: this.CompetênciasSheetID,
      });
    }

    if (this.iniciativesStatus == "ok" && this.iniciatives.length == 0) {
      await this.fetchIniciatives({
        sheetsAPIKey: env.sheetsAPIKey,
        sheetID: this.IniciativasSheetID,
      });
    }

    if (this.patentsStatus == "ok" && this.patents.length == 0) {
      await this.fetchPatents({
        sheetsAPIKey: env.sheetsAPIKey,
        sheetID: this.PatentesSheetID,
      });
    }

    if (this.companiesStatus == "ok" && this.companies.length == 0) {
      await this.fetchCompanies({
        sheetsAPIKey: env.sheetsAPIKey,
        sheetID: this.EmpresasSheetID,
      });
    }
  },
  methods: {
    ...mapActions({
      fetchDisciplines: "educacao/fetchSpreadsheets",
      fetchPDIs: "pdi/fetchSpreadsheets",
      fetchSkills: "competencia/fetchSpreadsheets",
      fetchIniciatives: "iniciativas/fetchSpreadsheets",
      fetchPatents: "patentes/fetchSpreadsheets",
      fetchCompanies: "empresas/fetchSpreadsheets",
      fetchSpreadsheetsID: "global/fetchSpreadsheetsID",
    }),
    submitSearch(searchTerm) {
      if (!searchTerm.trim()) {
        return;
      }
      this.$router.push({
        name: "search_results",
        params: { search: searchTerm },
      });
    },
  },
  head: {
    title: "Solus",
    meta: [
      {
        name: "google-site-verification",
        content: "6_EEYtY0wjahRpeFmJZ7qcVSuABHdi4mV5wa8Y1FmlE",
      },
    ],
  },
};
</script>

<style>
.dark-blue-layer {
  background: url("~@/vectors/dark_blue_layer.svg");
  position: absolute;
  height: 234px;
  max-height: 100%;
  width: 1180px;
  max-width: 100%;
  bottom: 0;
  left: 0;
}
.light-blue-layer {
  background: url("~@/vectors/light_blue_layer.svg");
  position: absolute;
  height: 388px;
  max-height: 100%;
  width: 1276px;
  max-width: 100%;
  bottom: 0;
  left: 0;
}
</style>
