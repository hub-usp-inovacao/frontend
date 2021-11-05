<template>
  <section>
    <div class="background">
      <Panel :title="title" :description="description" no-search />
    </div>

    <v-form ref="form">
      <v-container>
        <v-row v-if="errors.length > 0">
          <v-col>
            <v-alert v-for="error in errors" :key="error" type="error">{{
              error
            }}</v-alert>
          </v-col>
        </v-row>
        <v-row v-if="ok">
          <Stepper />
        </v-row>
        <v-row v-else>
          <v-col cols="10">
            <MaskInput
              :value="cnpj"
              label="CNPJ"
              mask="##.###.###/####-##"
              hint="SOMENTE empresas formalmente constituídas podem preencher este formulário."
              @input="setCnpj"
            />
          </v-col>
          <v-col cols="2" align="bottom">
            <v-btn
              color="secondary"
              width="100"
              text
              :loading="loading"
              :disabled="!isValid"
              @click="submit"
            >
              Enviar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Panel from "@/components/first_level/Panel.vue";
import MaskInput from "@/components/CompanyForms/inputs/MaskInput.vue";
import Stepper from "@/components/CompanyForms/Stepper.vue";

export default {
  components: {
    Panel,
    MaskInput,
    Stepper,
  },
  data: () => ({
    title: "Atualização de Empresas DNAUSP",
    description:
      "Representantes das Empresas podem solicitar, nesta página, a atualização dos dados cadastrados.\nPara poder atualizar os dados, você deve inserir abaixo o CNPJ de sua empresa",

    loading: false,
    ok: false,
  }),

  computed: {
    ...mapGetters({
      cnpj: "company_forms/cnpj",
      errors: "company_forms/errors",
    }),

    isValid() {
      return this.cnpj.length === 18;
    },
  },

  methods: {
    ...mapActions({
      setCnpj: "company_forms/setCnpj",
      getCompanyData: "company_forms/getCompanyData",
    }),

    async submit() {
      if (this.isValid) {
        this.loading = true;
        await this.getCompanyData();
        this.loading = false;

        if (this.errors.length === 0) {
          this.ok = true;
        }
      }
    },
  },
};
</script>
