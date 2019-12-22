<template>
  <div>
    <v-select
      :items="propsItems"
      :label="propsLabel"
      v-model="propsModel"
      color="rgba(29, 112, 191, 0.7)"
      style="color: white"
      chips
      multiple
      hide-details
      cache-items
      clearable
      deletable-chips
      small-chips
    />
  </div>
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
