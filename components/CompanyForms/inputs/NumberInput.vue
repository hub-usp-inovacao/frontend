<template>
  <div>
    <v-text-field
      type="number"
      :label="label"
      :rules="rules.input"
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
