<template>
  <v-container>
    <div class="mt-5 text-h6 font-weight-regular">
      Qual foi o faturamento da empresa em 2020? (R$)
      <NumberInput
        label="Faturamento"
        :value="financeValue"
        @input="setFinanceValue"
      />
      <legend class="body-2">
        Se for R$0,00 digite 0. Este dado NÃO será publicado.
      </legend>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NumberInput from "@/components/CompanyForms/inputs/NumberInput.vue";

export default {
  components: {
    NumberInput,
  },
  computed: {
    ...mapGetters({
      financeValue: "company_forms/financeValue",
    }),
  },
  methods: {
    ...mapActions({
      setFinanceValue: "company_forms/setFinanceValue",
    }),
  },
};
</script>
