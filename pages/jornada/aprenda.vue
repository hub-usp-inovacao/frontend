<template>
  <div>
    <Step
      title="aprenda"
      :description="description"
      color="#C0161B"
      :buttons="buttons"
      next="pratica"
      next-color="#E46926"
    >
      <template v-slot:PrimaryButtons>
        <v-row justify="center">
          <v-col cols="6">
            <div class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in buttons.primary"
                :key="label"
                class="white px-6 py-8 ma-1 flex-grow-1 button"
                max-width="100%"
                @click="select"
              >
                {{ label }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </template>
      <template v-slot:SecondaryButtons>
        <v-row justify="center">
          <v-col class="pt-0">
            <div class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in buttons.secondary"
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
      `Para aprender um pouco mais sobre inovação e empreendedorismo, curse as
disciplinas com potencial de geração de ideias, projetos, produtos e tecnologia
relacionadas a novos negócios, oferecidas por diferentes institutos. Hoje a USP
tem em sua grade cerca de 100 disciplinas de graduação e quase 40 disciplinas
de pós-graduação voltadas para os temas de inovação e empreendedorismo, que
podem ser encontradas em: https://hubusp.inovacao.usp.br/educacao`,
      `Você pode navegar pelas disciplinas de acordo com o nível de maturidade que
você busca em empreendedorismo e inovação:`,
    ],
    route: "aprenda",
    buttons: {
      primary: [{ label: "Graduação" }, { label: "Pós-Graduação" }],
      secondary: [
        { label: "Quero aprender!" },
        { label: "Tenho uma ideia, e agora?" },
        { label: "Preciso testar minha ideia!" },
        { label: "Tópicos avançados em empreendedorismo" },
      ],
    },
    selectedButton: undefined,
  }),

  methods: {
    select({ target }) {
      this.selectedButton = target.innerText;
    },
  },
};
</script>
