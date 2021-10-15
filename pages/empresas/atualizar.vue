<template>
  <section>
    <div class="background">
      <Panel :title="title" :description="description" no-search />
    </div>

    <v-form ref="form">
      <v-container>
        <v-row v-if="ok">
          <Stepper />
        </v-row>
        <v-row v-else>
          <v-col cols="10">
            <MaskInput
              v-model="cnpj"
              label="CNPJ"
              mask="##.###.###/####-##"
              hint="SOMENTE empresas formalmente constituídas podem preencher este formulário."
            />
          </v-col>
          <v-col cols="2" align="bottom">
            <v-btn
              color="secondary"
              width="100"
              text
              :loading="loading"
              :disabled="isValid"
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
    title: "Atualização de Empresas",
    description:
      "Representantes das Empresas podem solicitar, nesta página, a atualização dos dados cadastrados.\nPara poder atualizar os dados, você deve inserir abaixo o CNPJ de sua empresa",

    loading: false,
    ok: false,

    cnpj: "",
  }),

  computed: {
    isValid() {
      return this.cnpj.length !== 18;
    },
  },

  methods: {
    submit() {
      if (this.cnpj.length !== 18) {
        this.ok = false;
      } else {
        this.ok = true;
      }
    },
  },
};
</script>
