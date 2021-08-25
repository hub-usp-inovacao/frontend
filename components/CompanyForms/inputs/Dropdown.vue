<template>
  <LastUpdated :label="label" :last-updated="lastUpdated">
    <v-select
      :items="options"
      :value="value"
      :label="label"
      @input="$emit('input', $event)"
      clearable
    />
  </LastUpdated>
</template>

<script>
import LastUpdated from "@/components/CompanyForms/inputs/LastUpdated.vue";

export default {
  components: {
    LastUpdated,
  },
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
}
</script>
