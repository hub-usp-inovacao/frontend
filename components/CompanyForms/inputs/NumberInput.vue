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
    rule: {
      type: Number,
      required: false,
      default: () => /./,
    },
    value: {
      type: String,
    },
  },

  computed: {
    rules() {
      return {
        input: [(f) => this.rule.test(f) || "Formato inválido"],
      };
    },
  },
};
</script>
