<template>
  <div>
    <v-text-field
      v-mask="mask"
      :label="label"
      type="text"
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
      type: RegExp,
      required: false,
      default: () => /./,
    },
    mask: {
      type: String,
      default: "",
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
