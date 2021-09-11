<template>
  <v-container>
    <v-form>
      <ShortTextInput v-model="name" label="Nome" />
      <ShortTextInput v-model="corporateName" label="Razão social" />
      <ShortTextInput v-model="year" label="Ano" />
      <ShortTextInput v-model="cnpj" label="CNPJ" />
      <h2>CNAE</h2>
      <v-row>
        <v-col cols="6">
          <Dropdown
            v-model="cnae.major"
            label="Área principal"
            :options="cnaeMajors"
          />
        </v-col>
        <v-col cols="6">
          <Dropdown
            v-model="cnae.minor"
            label="Área secundária"
            :options="cnaeMinors(cnae.major)"
          />
        </v-col>
      </v-row>
      <ShortTextInput v-model="phone" label="Telefone" />
      <ShortTextInput v-model="email" label="Email" />
      <ShortTextInput v-model="address" label="Endereço" />
      <ShortTextInput v-model="neighborhood" label="Bairro" />
      <ShortTextInput v-model="city" label="Cidade" />
      <Dropdown v-model="state" label="Estado" :options="allStates" />
      <ShortTextInput v-model="cep" label="CEP" />
    </v-form>
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
    name: "",
    corporateName: "",
    year: "",
    cnpj: "",
    cnae: {
      major: "",
      minor: "",
    },
    phone: "",
    email: "",
    address: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: "",

    allStates: [],
  }),
  computed: {
    cnaeMajors() {
      return Object.keys(this.$reverseCNAE).sort();
    },
  },
  beforeMount() {
    this.getStates();
  },
  methods: {
    async getStates() {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const ufs = await response.json();
      this.allStates = ufs
        .map(({ nome, sigla }) => `${nome} - ${sigla}`)
        .sort();
    },
    cnaeMinors(major) {
      return major ? this.$reverseCNAE[major].map(({ minor }) => minor) : [];
    },
  },
};
</script>
