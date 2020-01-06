<template>
  <div>
    <v-text-field
      v-model="propsModel"
      append-icon="search"
      label="Procurar ..."
      color="white"
      hide-details
      clearable
      autofocus
    />
  </div>
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
