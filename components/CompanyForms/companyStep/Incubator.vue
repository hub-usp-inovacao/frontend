<template>
  <div>
    <h2 class="text-h6 mt-6">
      A empresa está ou esteve em alguma incubadora ou Parque tecnológico?
    </h2>
    <Dropdown :options="options" />
    <h2 class="text-h6 mt-6">
      Se sim, em qual incubadora ou Parque Tecnológico?
    </h2>
    <Dropdown :options="incubadoras" multiple-option="true" />
    <MultipleInputs title="Outros:" inputLabel="Incubadora/Parque Tecnológico" @items="outros = $event" />

  </div>
</template>

<script>
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue"

export default {
  components: {
    Dropdown,
    MultipleInputs
  },

  data: () => ({
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
    outros: []
  }),
};
</script>

<style></style>
