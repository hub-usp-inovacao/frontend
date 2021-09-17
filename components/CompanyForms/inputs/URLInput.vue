<template>
  <LastUpdated :label="label" :last-updated="lastUpdated">
    <v-text-field
      :label="label"
      :value="url"
      :rules="[rules.url]"
      clearable
      @input="handleInput"
    >
    </v-text-field>
  </LastUpdated>
</template>

<script>
import LastUpdated from "@/components/CompanyForms/inputs/LastUpdated.vue";

function validURL(str) {
  const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
  return !str?.includes(" ") && pattern.test(str);
}

export default {
  components: {
    LastUpdated,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: undefined,
    },
    lastUpdated: {
      type: String,
      required: false,
      default: undefined,
    },
  },
  data: () => ({
    isValid: false,
    url: undefined,
    rules: {
      url: (value) => validURL(value) || "URL inválida.",
    },
  }),
  methods: {
    handleInput(url) {
      this.url = url;

      if (validURL(url)) {
        this.isValid = true;
        this.$emit("input", url);
      } else if (this.isValid) {
        this.isValid = false;
        this.$emit("input", undefined);
      }
    },
  },
};
</script>
