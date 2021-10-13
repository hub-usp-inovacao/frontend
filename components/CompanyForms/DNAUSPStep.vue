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
      <BooleanInput v-model="want" label="sim" />

      <v-container v-if="want">
        <h4>
          Por qual email podemos entrar em contato para tratar do selo DNA USP?
        </h4>
        <ShortTextInput
          v-model="email"
          label="Email de contato"
          hint="Este dado não será publicado."
        />

        <h4>Qual o nome do responsável por este email?</h4>
        <ShortTextInput
          v-model="name"
          label="Nome"
          hint="Este dado não será publicado."
        />
      </v-container>
    </div>
  </section>
</template>

<script>
import BooleanInput from "@/components/CompanyForms/inputs/BooleanInput.vue";
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";

export default {
  components: {
    BooleanInput,
    ShortTextInput,
  },
  data: () => ({
    want: null,
    email: "",
    name: "",
  }),
};
</script>
