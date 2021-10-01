<template>
  <div>
    <v-text-field
      type="number"
      :label="label"
      :value="value"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
    },
  },
};
</script>
