<template>
  <div>
    <Description
      propsTitle="Empresas da Universidade de São Paulo"
      propsDescription="São as empresas criadas por alunos e ex-alunos USP ao longo dos anos."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSf_0YARRMgCe3Cy6GI03BexcRdjQqR5BOM0qwqCRaSnGoVwJQ/viewform"
    />

    <Grid
      :propsSheet="sheet"
      :propsIncubator="incubator"
      :propsCampus="campus"
      :propsUnity="unity"
    />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import Description from "@/components/Description.vue";

export default {
  components: {
    Grid,
    Description
  },
  data: () => ({
    sheet: [],
    incubator: [],
    campus: [],
    unity: []
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
          incubator: row.gsx$incubadora.$t,
          campus: row.gsx$campus.$t,
          unity: row.gsx$unidadedossocios.$t
        };

        if (!this.incubator.includes(company.incubator))
          this.incubator.push(company.incubator);

        if (!this.campus.includes(company.campus))
          this.campus.push(company.campus);

        if (!this.unity.includes(company.unity)) this.unity.push(company.unity);

        if (company.url.substring(0, 4) != "http")
          company.url = "http://" + company.url;

        this.sheet.push(company);
      });

      this.incubator.sort();
      this.campus.sort();
      this.unity.sort();
    }
  },
  created() {
    this.sheetQuery();
  }
};
</script>
