<template>
  <div>
    <div v-if="!touched" @click="touched = true">
      <p><span>{{ label }}:</span> {{ lastUpdatedMessage }}</p>
    </div>
    <v-textarea
      v-else
      :value="value"
      @input="$emit('input', $event)"
      :clearable="clearable"
      rows="2"
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
    lastUpdatedMessage() {
      return `Última atualização em ${this.lastUpdated}`;
    },
  },
}
</script>
