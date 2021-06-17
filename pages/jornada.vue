<template>
  <main>
    <v-container>
      <v-row v-for="({ title, color, caption }, i) in rows" :key="i">
        <v-col cols="4" :offset="i % 2 ? 2 : 0">
          <ColorfulCard :title="title" :color="color" :index="i + 1" />
        </v-col>
        <v-col cols="6" :offset="i % 2 ? 0 : 2">
          <div class="graybox">{{ caption }}</div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import ColorfulCard from "@/components/journey/ColorfulCard.vue";

export default {
  components: {
    ColorfulCard,
  },
  data: () => ({
    rows: [
      {
        title: "Processo de Aprendizagem",
        caption: `O passo inicial na sua jornada. 
                  Busque aprender sobre inovação
                  e empreendedorismo, cursando
                  as disciplinas oferecidas pela USP.`,
        color: "rgba(192, 22, 27, 1)",
      },
      {
        title: "Engajamento e começando a exercitar o empreendedorismo",
        caption: `Saiba tudo sobre entidades estudantis,
                  empresas júniores e também espaços
                  de convivência: aproveite ao máximo 
                  o que a comunidade USP oferece.`,
        color: "rgba(228, 105, 38, 1)",
      },
      {
        title: "Processo de incubação, criando minha própria empresa",
        caption: `Existe uma rede de ambientes possíveis
                  para que seu negócio se desenvolva,
                  tanto dentro quanto fora da USP.
                  Saiba mais sobre as incubadoras!`,
        color: "rgba(244, 196, 30, 1)",
      },
      {
        title: "Aprimorando tecnologias, fortalecendo a empresa",
        caption: `Conte com a competência de especialistas
                  da USP para formar parcerias, fortalecer sua empresa
                  e desenvolver o seu produto.`,
        color: "rgba(51, 140, 33, 1)",
      },
      {
        title: "Buscando financiamento",
        caption: `Descubra os primeiros passos
                  desta próxima jornada, sabendo
                  como se preparar para as principais
                  maneiras de captação de recursos.`,
        color: "rgba(33, 78, 140, 1)",
      },
    ],
  }),
};
</script>

<style scoped>
.graybox {
  width: 100%;
  min-height: 50%;

  margin-top: 2em;
  padding: 1em;

  background-color: lightgray;
}
</style>
