<template>
  <div>
    <div v-if="!touched" @click="touched = true">
      <p><span>{{ label }}:</span> {{ lastUpdatedMessage }}</p>
    </div>
    <v-select
      v-else
      :items="options"
      :value="value"
      :label="label"
      @input="$emit('input', $event)"
      clearable
    />
  </div>
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
      return `Última atualização em ${this.lastUpdated}`
    },
  },
}
</script>
