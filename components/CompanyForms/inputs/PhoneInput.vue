<template>
  <v-row>
    <v-col cols="3">
      <Dropdown
        v-model="selectedPhoneType"
        label="Tipo de telefone"
        :options="phoneTypes"
      />
    </v-col>
    <v-col>
      <MaskInput
        :value="value"
        label="Telefone"
        :mask="phoneMask"
        :rule="phoneRegex"
        :disabled="isPhoneTypeEmpty"
        @input="$emit('input', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
import MaskInput from "@/components/CompanyForms/inputs/MaskInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: {
    MaskInput,
    Dropdown,
  },
  props: {
    value: {
      type: String,
      required: true,
      default: () => "",
    },
  },
  data: () => ({
    phoneTypes: ["Fixo", "Celular"],
    selectedPhoneType: undefined,
  }),
  computed: {
    phoneMask() {
      return this.selectedPhoneType === "Celular"
        ? "(##) #####-####"
        : "(##) ####-####";
    },
    phoneRegex() {
      return this.selectedPhoneType === "Celular"
        ? /\(\d{2}\) \d{5}-\d{4}/
        : /\(\d{2}\) \d{4}-\d{4}/;
    },
    isPhoneTypeEmpty() {
      return this.selectedPhoneType === undefined;
    },
  },
};
</script>
