<template>
  <v-container>
    <h2 class="text-h6 mt-6 font-weight-regular">
      A empresa recebeu investimento? *
    </h2>
    <em class="body-2">
      Exemplos: investimento próprio, crowdfunding, equity-crowdfunding,
      investimento-anjo, venture capital, BNDES, FINEP, PIPE-FAPESP, outros.
    </em>
    <BooleanInput
      :value="receivedInvestments"
      label=""
      @input="setReceivedInvestments"
    />
    <h2 class="text-h6 mt-6 font-weight-regular">
      Se sim, quais investimentos a empresa recebeu?
    </h2>
    <Dropdown
      :value="preDefinedInvestments"
      :options="investimentos"
      multiple-option
      @input="setPreDefinedInvestments"
    />
    <div class="mt-5 text-h6 font-weight-regular">
      Outros
      <v-divider />
      <v-container>
        <MultipleInputs
          :value="otherInvestments"
          input-label="Investimento"
          @items="outros = $event"
          @input="setOtherInvestments"
        />
      </v-container>
    </div>
    <NumberInput
      :value="ownValue"
      label="Valor do investimento próprio (R$)"
      @input="setOwnValue"
    />
    <NumberInput
      :value="angelValue"
      label="Valor do investimento-anjo (R$)"
      @input="setAngelValue"
    />
    <NumberInput
      :value="ventureCapitalValue"
      label="Valor do Venture Capital (R$)"
      @input="setVentureCapitalValue"
    />
    <NumberInput
      :value="privateEquityValue"
      label="Valor do Private Equity (R$)"
      @input="setPrivateEquityValue"
    />
    <NumberInput
      :value="pipeFapespValue"
      label="Valor do PIPE-FAPESP (R$)"
      @input="setPipeFapespValue"
    />
    <NumberInput
      :value="otherValue"
      label="Outros investimentos (R$)"
      @input="setOtherValue"
    />
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  }),
  computed: {
    ...mapGetters({
      receivedInvestments: "company_forms/receivedInvestments",
      investments: "company_forms/investments",
      investmentValues: "company_forms/investmentValues",
    }),
    preDefinedInvestments() {
      return this.investments.filter((inv) =>
        this.investimentos.find((i) => i == inv)
      );
    },
    otherInvestments() {
      return this.investments.filter(
        (inv) => !this.investimentos.find((i) => i == inv)
      );
    },
    ownValue() {
      return this.investmentValues.own;
    },
    angelValue() {
      return this.investmentValues.angel;
    },
    ventureCapitalValue() {
      return this.investmentValues.ventureCapital;
    },
    privateEquityValue() {
      return this.investmentValues.privateEquity;
    },
    pipeFapespValue() {
      return this.investmentValues.pipeFapesp;
    },
    otherValue() {
      return this.investmentValues.other;
    },
  },
  methods: {
    ...mapActions({
      setReceivedInvestments: "company_forms/setReceivedInvestments",
      setInvestments: "company_forms/setInvestments",
      setInvestmentValues: "company_forms/setInvestmentValues",
    }),
    setPreDefinedInvestments(preDefinedInvestments) {
      this.setInvestments(preDefinedInvestments.concat(this.otherInvestments));
    },
    setOtherInvestments(otherInvestments) {
      this.setInvestments(this.preDefinedInvestments.concat(otherInvestments));
    },
    setOwnValue(newValue) {
      this.setInvestmentValues({ ...this.investmentValues, own: newValue });
    },
    setAngelValue(newValue) {
      this.setInvestmentValues({ ...this.investmentValues, angel: newValue });
    },
    setVentureCapitalValue(newValue) {
      this.setInvestmentValues({
        ...this.investmentValues,
        ventureCapital: newValue,
      });
    },
    setPrivateEquityValue(newValue) {
      this.setInvestmentValues({
        ...this.investmentValues,
        privateEquity: newValue,
      });
    },
    setPipeFapespValue(newValue) {
      this.setInvestmentValues({
        ...this.investmentValues,
        pipeFapesp: newValue,
      });
    },
    setOtherValue(newValue) {
      this.setInvestmentValues({ ...this.investmentValues, other: newValue });
    },
  },
};
</script>
