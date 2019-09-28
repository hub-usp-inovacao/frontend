<template>
  <div>
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
      { value: "sector" },
      { value: "logo" },
      { value: "url" },
      { value: "description" }
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
          sector: row.gsx$tecnologiasqueutiliza.$t,
          logo: row.gsx$logo.$t,
          url: row.gsx$website.$t,
          description: row.gsx$descriçãodonegócio.$t
        };
        if (company.logo)
          this.sheet.push(company);
      });
    }
  },
  created() {
    this.sheetQuery();
  }
};
</script>
