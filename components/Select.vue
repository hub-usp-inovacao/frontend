<template>
  <div>
    <v-select
      flat
      filled
      rounded
      hide-details
      multiple
      v-model="selected"
      menu-props="auto"
      :items="items"
      no-data-text="Não encontramos nada"
      :label="label"
    >
      <template v-slot:selection="{ item, index }">
        <span v-if="index === 0" class="text-truncate">{{ item }}</span>
        <span v-if="index === 1" class="gray--text caption">,&#160;(+{{ selected.length - 1 }})</span>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: []
  }),
  props: ["items", "label"],
  watch: {
    selected(s) {
      this.$emit("select", s);
    }
  }
};
</script>