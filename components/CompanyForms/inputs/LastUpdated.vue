<template>
  <div>
    <div class="mb-8 mt-2" v-if="!touched" @click="touched = true">
      <p><span>{{ label }}:</span> {{ lastUpdatedMessage }}</p>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
