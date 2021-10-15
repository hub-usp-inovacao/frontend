<template>
  <v-container>
    <v-form>
      <NumberInput
        :value="numberOfCTLEmployees"
        label="Qual o número de funcionários contratados como CLT?"
        @input="setNumberOfCTLEmployees"
      />
      <NumberInput
        :value="numberOfPJColaborators"
        label="Qual o número de colaboradores contratados como pessoa jurídica (PJ)?"
        @input="setNumberOfPJColaborators"
      />
      <NumberInput
        :value="numberOfInterns"
        label="Qual o número de estagiários/bolsistas contratados?"
        @input="setNumberOfInterns"
      />
    </v-form>
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
      numberOfCTLEmployees: "company_forms/numberOfCTLEmployees",
      numberOfPJColaborators: "company_forms/numberOfPJColaborators",
      numberOfInterns: "company_forms/numberOfInterns",
    }),
  },
  methods: {
    ...mapActions({
      setNumberOfCTLEmployees: "company_forms/setNumberOfCTLEmployees",
      setNumberOfPJColaborators: "company_forms/setNumberOfPJColaborators",
      setNumberOfInterns: "company_forms/setNumberOfInterns",
    }),
  },
};
</script>
