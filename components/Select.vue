<template>
  <v-container>
    <v-select
      :items="propsItems"
      :label="propsLabel"
      v-model="propsModel"
      chips
      multiple
      hide-details
      cache-items
      clearable
      deletable-chips
      small-chips
    />
  </v-container>
</template>

<script>
export default {
  props: ["propsItems", "propsLabel", "propsModel"],
  watch: {
    propsModel(p) {
      this.$emit("input", p);
    }
  }
};
</script>
