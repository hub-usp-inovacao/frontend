<template>
  <div>
    <div class="background">
      <Panel
        title="Empresas"
        description="Incubadoras e outras estruturas da Universidade facilitam a criação de empresas e negócios por parte de estudantes e pesquisadores.  Estas são as empresas com DNA USP que estão organizadas, no Portal Solus, por áreas de atuação e tecnologias aplicáveis. Com o nosso mecanismo de busca, é possível consultar as empresas por palavras-chave ou CNAEs (Classificação Nacional de Atividades Econômicas)."
        url="https://forms.gle/LjSkgb46xqcQdkkv6"
      />
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndCard :items="entries" />
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="entries" />
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Background from "@/components/Background.vue";
import ListAndCard from "@/components/ListAndCard.vue";
import SelectAndCard from "@/components/SelectAndCard.vue";

export default {
  components: {
    Panel,
    Background,
    ListAndCard,
    SelectAndCard
  },
  data: () => ({
    entries: []
  }),
  methods: {
    async querySheet() {
      return;
    }
  },
  created() {}
};
</script>
