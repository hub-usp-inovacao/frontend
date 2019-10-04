<template>
  <div>
    <v-container class="my-12">
      <v-row>
        <v-col class="my-12">
          <h1>Empresas da Universidade de São Paulo</h1>
          <p>São as empresas criadas por alunos e ex-alunos USP ao longo dos anos.</p>
          <v-btn
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_0YARRMgCe3Cy6GI03BexcRdjQqR5BOM0qwqCRaSnGoVwJQ/viewform"
          >Cadastre a sua</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <Grid :propsSheet="sheet" :propsHeaders="headers" :propsSize="sheet.length" />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  components: {
    Grid
  },
  data: () => ({
    headers: [
      { value: "name" },
      { value: "tech" },
      { value: "logo" },
      { value: "url" },
      { value: "description" },
      { value: "products" }
    ],
    sheet: []
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1KMMPp5tW_Ou4ZkvkQrvni_8A-_NDD7hkS-qPrNjRTRY/o6mbfy9/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let company = {
          name: row.gsx$_cn6ca.$t,
          tech: row.gsx$tecnologiasqueutiliza.$t,
          logo: row.gsx$logo.$t,
          url: row.gsx$website.$t,
          description: row.gsx$descriçãodonegócio.$t,
          products: row.gsx$principaisprodutosouserviços.$t,
        };
        this.sheet.push(company);
      });
    }
  },
  created() {
    this.sheetQuery();
  }
};
</script>
