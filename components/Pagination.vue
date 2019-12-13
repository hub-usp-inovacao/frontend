<template>
  <v-container>
    <v-pagination v-model="propsPage" :length="numberOfPages()" total-visible="7" />
  </v-container>
</template>

<script>
export default {
  props: ["propsLength", "propsPage", "propsItemsPerPage"],
  methods: {
    numberOfPages() {
      return Math.ceil(this.propsLength / this.propsItemsPerPage);
    }
  },
  watch: {
    propsPage(p) {
      this.$emit("input", p);
    }
  }
};
</script>
