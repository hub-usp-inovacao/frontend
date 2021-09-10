<template>
  <v-container>
    <ShortTextInput label="Nome" />
    <ShortTextInput label="Razão social" />
    <ShortTextInput label="Ano" />
    <ShortTextInput label="CNPJ" />
    <h2>CNAE</h2>
    <v-row>
      <v-col cols="6">
        <Dropdown label="Área principal" :options="cnaeMajors" />
      </v-col>
      <v-col cols="6">
        <ShortTextInput label="Área secundária" />
      </v-col>
    </v-row>
    <ShortTextInput label="Telefone" />
    <ShortTextInput label="Email" />
    <ShortTextInput label="Endereço" />
    <ShortTextInput label="Bairro" />
    <ShortTextInput label="Cidade" />
    <Dropdown label="Estado" :options="states" />
    <ShortTextInput label="CEP" />
  </v-container>
</template>

<script>
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: {
    ShortTextInput,
    Dropdown,
  },
  data: () => ({
    states: [],
  }),
  computed: {
    cnaeMajors() {
      return Object.keys(this.$reverseCNAE).sort();
    },
  },
  async beforeMount() {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
    const ufs = await response.json();
    this.states = ufs.map((uf) => uf.nome).sort();
  },
  methods: {
    cnaeMinors(major) {
      if (!major) return undefined;
      return this.$reverseCNAE[major].map(({ minor }) => minor);
    },
  },
};
</script>
