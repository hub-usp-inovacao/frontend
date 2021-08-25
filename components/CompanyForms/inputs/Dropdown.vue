<template>
  <v-select
    :items="options"
    :value="value"
    :label="label"
    @input="$emit('input', $event)"
    clearable
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    value: {
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
