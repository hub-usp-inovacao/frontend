<template>
  <v-app>
    <Table :s="sheet" :h="headers" />
    <Grid :s="sheet" :h="headers" />
  </v-app>
</template>

<script>
import Table from "@/components/Table.vue";
import Grid from "@/components/Grid.vue";

export default {
  components: {
    Table,
    Grid
  },
  data() {
    return {
      headers: [{ value: "name" }, { value: "sector" }],
      sheet: []
    };
  },
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1-m11ldmwNK7yIB7RcCWRxs5uDoRFG_lPu2WSlDN1fVo/od6/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let v = {
          name: row.gsx$nomefantasia.$t,
          sector: row.gsx$setordeatuaçãocnae.$t
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
