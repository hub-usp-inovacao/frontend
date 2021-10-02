<template>
  <v-container>
    <v-form>
      <NumberInput
        label="Qual o número de funcionários contratados como CLT?"
      />
      <NumberInput
        label="Qual o número de colaboradores contratados como pessoa jurídica (PJ)?"
      />
      <NumberInput
        label="Qual o número de estagiários/bolsistas contratados?"
      />
    </v-form>
  </v-container>
</template>

<script>
import NumberInput from "@/components/CompanyForms/inputs/NumberInput.vue";

export default {
  components: {
    NumberInput,
  },
};
</script>
