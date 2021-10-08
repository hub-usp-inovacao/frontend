<template>
  <v-container>
    <h2 class="text-h6 mt-6 font-weight-regular">A empresa recebeu investimento? *</h2>
    <em class="body-2">
      Exemplos: investimento próprio, crowdfunding, equity-crowdfunding,
      investimento-anjo, venture capital, BNDES, FINEP, PIPE-FAPESP, outros.
    </em>
    <BooleanInput label="" />
    <h2 class="text-h6 mt-6 font-weight-regular">
      Se sim, quais investimentos a empresa recebeu?
    </h2>
    <Dropdown :options="investimentos" multiple-option />
    <div class="mt-5 text-h6 font-weight-regular">
      Outros
      <v-divider />
      <v-container>
        <MultipleInputs input-label="Investimento" @items="outros = $event" />
      </v-container>
    </div>
    <NumberInput label="Valor do investimento próprio (R$)" />
    <NumberInput label="Valor do investimento-anjo (R$)" />
    <NumberInput label="Valor do Venture Capital (R$)" />
    <NumberInput label="Valor do Private Equity (R$)" />
    <NumberInput label="Valor do PIPE-FAPESP (R$)" />
    <NumberInput label="Outros investimentos (R$)" />
  </v-container>
</template>

<script>
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";
import BooleanInput from "@/components/CompanyForms/inputs/BooleanInput.vue";
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue";
import NumberInput from "@/components/CompanyForms/inputs/NumberInput.vue";

export default {
  components: {
    Dropdown,
    BooleanInput,
    MultipleInputs,
    NumberInput,
  },

  data: () => ({
    investimentos: [
      "Investimento próprio",
      "Investimento-anjo",
      "Crowdfunding",
      "Venture capital",
      "Private equity",
      "PIPE-FAPESP",
      "BNDES e/ou FINEP",
    ],
    outros: [],
  }),
};
</script>

<style></style>
