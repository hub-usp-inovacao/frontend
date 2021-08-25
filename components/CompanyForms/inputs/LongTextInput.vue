<template>
  <LastUpdated :label="label" :last-updated="lastUpdated" >
    <v-textarea
      :value="value"
      @input="$emit('input', $event)"
      :clearable="clearable"
      rows="2"
      :label="label"
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
      default: undefined,
    },
  },
}
</script>
