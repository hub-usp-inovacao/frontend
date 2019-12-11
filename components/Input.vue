<template>
  <v-container>
    <v-text-field
      v-model="propsModel"
      append-icon="search"
      label="Procurar ..."
      hide-details
      clearable
      autofocus
    />
  </v-container>
</template>

<script>
export default {
  props: ["propsModel"],
  watch: {
    propsModel(p) {
      this.$emit("input", p);
    }
  }
};
</script>
