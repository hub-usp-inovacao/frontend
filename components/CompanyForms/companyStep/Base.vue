<template>
  <v-container>
    <v-form>
      <div class="mt-5 text-h6 font-weight-regular">
        Dados básicos
        <v-divider />
        <v-container>
          <ShortTextInput
            v-model="name"
            label="Nome fantasia da empresa"
            hint="A empresa será listada no Hub USPInovação a partir do nome fantasia da mesma."
          />
          <ShortTextInput
            v-model="corporateName"
            label="Razão social da empresa"
          />
          <Mask v-model="year" mask="####" label="Ano de fundação" />
          <MaskInput
            v-model="cnpj"
            label="CNPJ"
            mask="##.###.###/####-##"
            hint="SOMENTE empresas formalmente constituídas podem preencher este formulário. Caso a empresa não possua CNPJ ainda, aguarde até a constituição da mesma para realizar o cadastro. Em caso de empresas estabelecidas no exterior, favor entrar em contato pelo e-mail hubusp.inovacao@usp.br"
          />
        </v-container>
      </div>

      <div class="mt-8 text-h6 font-weight-regular">
        CNAE (Classificação Nacional de Atividades Econômicas) da empresa
        <v-divider />
        <v-container>
          <legend class="body-2">
            Para consultar o CNAE cole o CNPJ da empresa no
            <a
              href="http://servicos.receita.fazenda.gov.br/Servicos/cnpjreva/Cnpjreva_Solicitacao.asp?cnpj"
              target="_blank"
              >site da receita</a
            >.
          </legend>
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
        </v-container>
      </div>

      <div class="mt-5 text-h6 font-weight-regular">
        Contato
        <v-divider />
        <v-container>
          <p class="body-2">Telefones comerciais</p>
          <MultipleInputs
            input-label="Telefone comercial"
            component="PhoneInput"
            mask="(##) ####-####"
            @items="phones = $event"
          />
          <ShortTextInput v-model="email" label="Email" />
          <ShortTextInput v-model="address" label="Endereço" />
          <ShortTextInput v-model="neighborhood" label="Bairro" />
          <ShortTextInput v-model="city" label="Cidade sede" />
          <Dropdown v-model="state" label="Estado" :options="allStates" />
          <MaskInput
            v-model="cep"
            label="CEP"
            mask="#####-###"
            :rule="/\d{5}-\d{3}/"
          />
        </v-container>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue";
import MaskInput from "@/components/CompanyForms/inputs/MaskInput.vue";
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: {
    MaskInput,
    MultipleInputs,
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
    phones: [],
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
        .map(({ nome, sigla }) => `${nome} (${sigla})`)
        .sort();
    },
    cnaeMinors(major) {
      return major ? this.$reverseCNAE[major].map(({ minor }) => minor) : [];
    },
  },
};
</script>
