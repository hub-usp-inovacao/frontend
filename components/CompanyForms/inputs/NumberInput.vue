<template>
  <div>
    <v-text-field v-mask="mask" type="text" :rules="rules.input" @input="$emit('input',$event)" :value="value"/>
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
      default: () => /./
    },
    mask: {
      type: String,
      default: ""
    },
    value: {
      type: String
    }
  },

  computed: {
    rules() {
      return {
        input: [(f) => this.rule.test(f) || "Formato inválido"],
      }
    }
  },
};
</script>
