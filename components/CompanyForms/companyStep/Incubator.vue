<template>
  <v-container>
    <h2 class="text-h6 mt-6 font-weight-regular">
      A empresa está ou esteve em alguma incubadora ou Parque tecnológico?
    </h2>
    <Dropdown v-model="value" :options="options" label="" />
    <h2 class="text-h6 mt-6 font-weight-regular">
      Se sim, em qual incubadora ou Parque Tecnológico?
    </h2>
    <Dropdown
      :options="incubadoras"
      multiple-option
      :disabled="value === 'Não'"
      label=""
    />
    <div class="mt-5 text-h6 font-weight-regular">
      Outros
      <v-divider />
      <v-container>
        <MultipleInputs
          input-label="Incubadora/Parque Tecnológico"
          @items="outros = $event"
        />
      </v-container>
    </div>
  </v-container>
</template>

<script>
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue";

export default {
  components: {
    Dropdown,
    MultipleInputs,
  },

  data: () => ({
    value: "",
    options: [
      "Não",
      "Sim. A empresa está incubada",
      "Sim. A empresa já está graduada",
    ],
    incubadoras: [
      "CIETEC - Centro de Inovação, Empreendedorismo e Tecnologia",
      "ESALQTec - Incubadora de Empresas Agrozootécnicas de Piracicaba",
      "HABITs - Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
      "Supera - Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
      "Supera Parque de Inovação e Tecnologia",
    ],
    outros: [],
  }),
};
</script>

<style></style>
