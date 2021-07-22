<template>
  <div>
    <Step
      title="A Ideia na Prática"
      :description="description"
      color="#E46926"
      :buttons="buttons"
      next="criar"
      previous="aprenda"
      next-color="#F4C41E"
      previous-color="#C0161B"
      :items="filteredDisciplines"
    >
      <template v-slot:SecondaryButtons>
        <v-row justify="center">
          <v-col class="pt-0">
            <div class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in buttons"
                :key="label"
                class="white px-6 py-6 ma-1 flex-grow-1 button"
                max-width="100%"
                @click="select"
              >
                {{ label }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>
    </Step>
  </div>
</template>

<script>
import Step from "@/components/journey/Step.vue";

export default {
  components: {
    Step,
  },
  data: () => ({
    description: [
      `Quer encontrar uma galera que esteja a fim de apoiar e trabalhar nas mesmas
  causas que você? Busque a entidade estudantil com a qual você mais se
  identifica e junte-se a essa turma:`,
      `Quer trabalhar com projetos ligados a inovação e empreendedorismo e ao mesmo
  tempo dar início à sua carreira? As Empresas Júnior são associações de alunos
  que prestam diferentes tipos de serviços, participe.`,
      `Na hora de colocar a sua ideia em prática, você pode participar de programas que
  inspiram e promovem o desenvolvimento de iniciativas inovadoras e
  empreendedoras disponíveis para a Comunidade USP:`,
      `Na hora de colocar a sua ideia em prática, você pode participar de programas que
  inspiram e promovem o desenvolvimento de iniciativas inovadoras e
  empreendedoras disponíveis para a Comunidade USP:`,
      `Precisando de um lugar para colocar a sua ideia em prática? Procure os espaços
  da Universidade onde você poderá interagir com projetos e organizações ligadas
  à inovação e ao empreendedorismo`,
    ],
    route: "pratica",
    buttons: [
      { label: "Empresa Jr." },
      { label: "Ideação" },
      { label: "Grupos e Iniciativas Estudantis" },
      { label: "Entidade Estudantil" },
      { label: "Espaço/coworking" },
    ],
  }),

  selectedButtonSecondary: undefined,
};
</script>

<style></style>
