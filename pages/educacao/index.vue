<template>
  <v-app>
    <Table :s="sheet" :h="headers" />
  </v-app>
</template>

<script>
import Table from "../../components/Table.vue";

export default {
  components: {
    Table
  },
  data: () => ({
    sheet: [],
    headers: [
      { text: "Disciplinas", value: "name" },
      { text: "Campus", value: "campus" },
      { text: "Unidade", value: "unity" },
      { text: "Descrição", value: "description" }
    ]
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/102q6lFiHtBFA24ldqTjmAgUlGFeSFATARn260i7WVvs/oqw270x/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let v = {
          name: row.gsx$matéria.$t,
          campus: row.gsx$campus.$t,
          unity: row.gsx$unidade.$t,
          url: row.gsx$url.$t,
          description: row.gsx$descriçãocurtaaté170caracteres.$t
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
