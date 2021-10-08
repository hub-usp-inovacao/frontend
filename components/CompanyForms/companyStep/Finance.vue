<template>
  <div>
    <h2 class="text-h6 mt-6">A empresa recebeu investimento? *</h2>
    <em>
      Exemplos: investimento próprio, crowdfunding, equity-crowdfunding,
      investimento-anjo, venture capital, BNDES, FINEP, PIPE-FAPESP, outros.
    </em>
    <BooleanInput label="" />
    <h2 class="text-h6 mt-6">
      Se sim, em qual incubadora ou Parque Tecnológico?
    </h2>
    <Dropdown :options="investimentos" multiple-option />
    <MultipleInputs
      title="Outras incubadoras ou Parques Tecnológicos:"
      input-label="Incubadora/Parque Tecnológico"
      @items="outros = $event"
    />
    <NumberInput label="Valor do investimento próprio (R$)" />
    <NumberInput label="Valor do investimento-anjo (R$)" />
    <NumberInput label="Valor do Venture Capital (R$)" />
    <NumberInput label="Valor do Private Equity (R$)" />
    <NumberInput label="Valor do PIPE-FAPESP (R$)" />
    <NumberInput label="Outros investimentos (R$)" />
  </div>
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
