<template>
  <v-app>
    ola
    {{test}}
    <Table :test="this.test" />
  </v-app>
</template>

<script>
import Table from "../../components/Table.vue";

export default {
  components: {
    Table
  },
  data() {
    return {
      sheet: [],
      headers: [{ value: "name" }, { value: "sector" }],
      test: "hey"
    };
  }
  // methods: {
  //   async sheetQuery() {
  //     const request = await fetch(
  //       "https://spreadsheets.google.com/feeds/list/1-m11ldmwNK7yIB7RcCWRxs5uDoRFG_lPu2WSlDN1fVo/od6/public/values?alt=json"
  //     );
  //     const data = await request.json();
  //     data.feed.entry.forEach(row => {
  //       let v = {
  //         name: row.gsx$nomefantasia.$t,
  //         sector: row.gsx$setordeatuaçãocnae.$t
  //       };
  //       this.sheet.push(v);
  //     });
  //     this.sheet = data;
  //   }
  // },
  // created() {
  //   this.sheetQuery();
  // }
};
</script>
