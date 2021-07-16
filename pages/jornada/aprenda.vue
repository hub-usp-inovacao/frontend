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
    pages: [
      {
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
      },
    ],
  }),
};
</script>
