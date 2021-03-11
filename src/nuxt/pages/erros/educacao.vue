<template>
  <ErrorsTable :errors="errors" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ErrorsTable from "@/components/temporary/ErrorsTable.vue";

export default {
  components: {
    ErrorsTable,
  },
  computed: {
    ...mapGetters({
      errors: "educacao/errors",
    }),
  },
  beforeMount() {
    this.bootstrap();
  },
  methods: {
    ...mapActions({
      getData: "educacao/fetchSpreadsheets",
    }),
    bootstrap() {
      const ctx = {
        sheetsAPIKey: process.env.sheetsAPIKey,
        sheetID: process.env.sheetID,
      };

      if (this.errors == undefined) {
        this.getData(ctx);
      }
    },
  },
};
</script>
