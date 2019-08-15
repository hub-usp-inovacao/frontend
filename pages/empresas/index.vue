<template>
  <v-app>
    <Table :url="url" />
  </v-app>
</template>

<script>
import Table from "../../components/Table.vue";

export default {
  components: {
    Table
  },
  data: () => ({
    url:
      "https://spreadsheets.google.com/feeds/list/1-m11ldmwNK7yIB7RcCWRxs5uDoRFG_lPu2WSlDN1fVo/od6/public/values?alt=json"
  })
};
</script>
