<template>
  <v-textarea
    :value="value"
    @input="$emit('input', $event)"
    :clearable="clearable"
    rows="2"
    :label="label"
  />
</template>

<script>
export default {
  props: {
    clearable: {
      type: Boolean,
      required: false,
      default: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
