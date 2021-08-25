<template>
  <div>
    <div v-if="!touched" @click="touched = true">
      <p><span>{{ label }}:</span> {{ lastUpdatedMessage }}</p>
    </div>
    <v-text-field
      v-else
      :value="value"
      @input="$emit('input', $event)"
      :clearable="clearable"
      :counter="counter"
      :label="label"
    />
  </div>
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
    lastUpdated: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    touched: false,
  }),

  computed: {
    counter() {
      return this.maxLength <= 0 ? false : this.maxLength;
    },
    lastUpdatedMessage() {
      return `Última atualização em ${this.lastUpdated}`;
    },
  },
}
</script>
