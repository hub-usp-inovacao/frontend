<template>
  <section>
    <h1>Marca DNA USP</h1>
    <p>
      A utilização da marca somente pode ocorrer após a autorização da Agência
      USP de Inovação. Os dados da empresa serão validados e, posteriormente,
      entraremos em contato para tratar da autorização de uso da marca DNA USP.
      Também enviaremos o logotipo em alta resolução e o manual de uso da marca.
    </p>

    <img :src="require('@/vectors/dnausp.svg')" alt="DNA USP" />
    <div>
      <h2>Sua empresa gostaria de receber o selo DNA USP?</h2>
      <BooleanInput :value="wantsDna" label="sim" @input="setWantsDna" />

      <v-container v-if="wantsDna">
        <h4>
          Por qual email podemos entrar em contato para tratar do selo DNA USP?
        </h4>
        <ShortTextInput
          :value="dnaContactEmail"
          label="Email de contato"
          hint="Este dado não será publicado."
          @input="setDnaContactEmail"
        />

        <h4>Qual o nome do responsável por este email?</h4>
        <ShortTextInput
          :value="dnaContactName"
          label="Nome"
          hint="Este dado não será publicado."
          @input="setDnaContactName"
        />
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BooleanInput from "@/components/CompanyForms/inputs/BooleanInput.vue";
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";

export default {
  components: {
    BooleanInput,
    ShortTextInput,
  },
  computed: {
    ...mapGetters({
      wantsDna: "company_forms/wantsDna",
      dnaContactName: "company_forms/dnaContactName",
      dnaContactEmail: "company_forms/dnaContactEmail",
    }),
  },
  methods: {
    ...mapActions({
      setWantsDna: "company_forms/setWantsDna",
      setDnaContactName: "company_forms/setDnaContactName",
      setDnaContactEmail: "company_forms/setDnaContactEmail",
    }),
  },
};
</script>
