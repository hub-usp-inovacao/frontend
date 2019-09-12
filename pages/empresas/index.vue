<template>
  <v-app>
    <Grid :s="sheet" :h="headers" :size="sheet.length" />
  </v-app>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  components: {
    Grid
  },
  data() {
    return {
      headers: [
        { value: "name" },
        { value: "sector" },
        { value: "logo" },
        { value: "url" },
        { value: "description" }
      ],
      sheet: []
    };
  },
  head() {
    return {
      meta: {
        hid: "Empresas",
        name: "Empresas",
        content: "Empresas"
      }
    };
  },
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1KMMPp5tW_Ou4ZkvkQrvni_8A-_NDD7hkS-qPrNjRTRY/o6mbfy9/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let v = {
          name: row.gsx$_cn6ca.$t,
          sector: row.gsx$tecnologiasqueutiliza.$t,
          logo: row.gsx$logo.$t,
          url: row.gsx$website.$t,
          description: row.gsx$descriçãodonegócio.$t
        };
        this.sheet.push(v);
      });
    }
  },
  created() {
    this.sheetQuery();
  }
};
</script>
