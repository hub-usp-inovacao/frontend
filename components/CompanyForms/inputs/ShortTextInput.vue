<template>
  <v-text-field
    :value="value"
    @input="$emit('input', $event)"
    :clearable="clearable"
    :counter="counter"
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
    maxLength: {
      type: Number,
      required: false,
      default: -1
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

  computed: {
    counter() {
      return this.maxLength <= 0 ? false : this.maxLength;
    },
  },
}
</script>
