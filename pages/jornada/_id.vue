<template>
  <div>
    <Step
      :title="title"
      :description="description"
      :next="next"
      :previous="previous"
    >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda magnam
      sunt accusamus, iste non illo quae, esse molestias voluptas vel omnis
      consequatur quod pariatur ducimus in dicta, quidem asperiores excepturi!
    </Step>
  </div>
</template>

<script>
import Step from "@/components/journey/Step.vue";

export default {
  components: {
    Step,
  },
  middleware({ route, redirect }) {
    const valid = ["aprenda", "pratica", "criar", "aprimorar", "financiamento"];
    const isValid = valid.includes(route.params.id);

    if (!isValid) redirect("/jornada");
  },

  data: () => ({
    pageTitles: {
      aprenda: "Aprenda",
      pratica: "A Ideia na Prática",
      criar: "Criar a Empresa",
      aprimorar: "Aprimorar o Negócio",
      financiamento: "Financiamento",
    },

    pagesDescription: {
      aprenda: "Aprenda",
      pratica: "A Ideia na Prática",
      criar: "Criar a Empresa",
      aprimorar: "Aprimorar o Negócio",
      financiamento: "Financiamento",
    },
  }),

  computed: {
    title() {
      const id = this.$route.params.id;
      return this.pageTitles[id];
    },

    description() {
      const id = this.$route.params.id;
      return this.pagesDescription[id];
    },

    allTitles() {
      return Object.values(this.pageTitles);
    },

    previous() {
      const self = this.allTitles.findIndex((el) => el === this.title);
      return this.allTitles[self - 1] || "";
    },

    next() {
      const self = this.allTitles.findIndex((el) => el === this.title);
      return this.allTitles[self + 1] || "";
    },
  },
};
</script>
