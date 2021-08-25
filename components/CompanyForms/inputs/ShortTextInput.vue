<template>
  <LastUpdated :label="label" :last-updated="lastUpdated" >
    <v-text-field
      :value="value"
      @input="$emit('input', $event)"
      :clearable="clearable"
      :counter="counter"
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
      default: undefined,
    },
  },

  computed: {
    counter() {
      return this.maxLength <= 0 ? false : this.maxLength;
    },
  },
}
</script>
