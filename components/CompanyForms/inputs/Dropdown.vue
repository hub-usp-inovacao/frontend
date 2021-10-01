<template>
  <LastUpdated :label="label" :last-updated="lastUpdated">
    <v-select
      :items="options"
      :value="value"
      :label="label"
      clearable
      :multiple="multipleOption"
      @input="$emit('input', $event)"
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
    multipleOption: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      required: false,
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
};
</script>
