<template>
  <div>
    <v-pagination v-model="propsPage" :length="numberOfPages()" total-visible="7" />
  </div>
</template>

<script>
export default {
  props: ["propsLength", "propsPage"],
  data: () => ({
    itemsPerPage: 32
  }),
  methods: {
    numberOfPages() {
      return Math.ceil(this.propsLength / this.itemsPerPage);
    }
  },
  watch: {
    propsPage(p) {
      this.$emit("input", p);
    }
  }
};
</script>
