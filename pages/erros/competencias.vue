<template>
  <ErrorsTable :errors="errors" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ErrorsTable from "@/components/temporary/ErrorsTable.vue";

export default {
  components: {
    ErrorsTable,
  },
  computed: {
    ...mapGetters({
      errors: "competencia/errors",
    }),
  },
  beforeMount() {
    this.bootstrap();
  },
  methods: {
    ...mapActions({
      getData: "competencia/fetchSpreadsheets",
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
