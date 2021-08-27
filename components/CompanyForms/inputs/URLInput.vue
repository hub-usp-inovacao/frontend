<template>
  <LastUpdated :label="label" :last-updated="lastUpdated">
    <v-text-field
      :label="label"
      :value="value"
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
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
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
    rules: {
      url: (value) => validURL(value) || "URL inválida.",
    },
  }),
  methods: {
    handleInput(url) {
      if (validURL(url)) {
        this.$emit("input", url);
      }
    },
  },
};
</script>

<style></style>
