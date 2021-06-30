<template>
  <div>
    <Step
      :title="title"
      :description="description"
      :color="color"
      :buttons="buttons"
      :next="next"
      :previous="previous"
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
  middleware({ route, redirect }) {
    const valid = ["aprenda", "pratica", "criar", "aprimorar", "financiamento"];
    const isValid = valid.includes(route.params.id);

    if (!isValid) redirect("/jornada");
  },

  data: () => ({
    pages: [
      {
        route: "aprenda",
        title: "Aprenda",
        color: "#C0161B",
        buttons: [
          { label: "Graduação" },
          { label: "Pós-Graduação" },
          { label: "Quero aprender!" },
          { label: "Tenho uma ideia, e agora?" },
          { label: "Preciso testar minha ideia!" },
          { label: "Tópicos avançados em empreendedorismo" },
        ],
        description: `Processo de aprendizagem e disciplinas

Para aprender um pouco mais sobre inovação e empreendedorismo, curse as disciplinas com potencial de geração de ideias, projetos, produtos e tecnologia relacionadas a novos negócios, oferecidas por diferentes institutos. Hoje a USP tem em sua grade cerca de 100 disciplinas de graduação e quase 40 disciplinas de pós-graduação voltadas para os temas de inovação e empreendedorismo, que podem ser encontradas em: 

<https://hubusp.inovacao.usp.br/educacao>

Você pode navegar pelas disciplinas de acordo com o nível de maturidade que você busca em empreendedorismo e inovação.
`,
      },
      {
        route: "pratica",
        title: "A Ideia na Prática",
        color: "#E46926",
        buttons: [
          { label: "Agente Institucional" },
          { label: "Empresa Jr." },
          { label: "Ideação" },
          { label: "Entidade Associada" },
          { label: "Entidade Estudantil" },
          { label: "Espaço/coworking" },
          { label: "Grupos e Iniciativas Estudantis" },
          { label: "Incubadora e Parque Tecnológico" },
        ],
        description: `Engajamento e exercitando o empreendedorismo

Entidades estudantis: quer encontrar uma galera que esteja a fim de apoiar e trabalhar nas mesmas causas que você? Busque a entidade estudantil com a qual você mais se identifica e junte-se a essa turma.

Empresas Júnior: quer trabalhar com projetos ligados a inovação e empreendedorismo e ao mesmo tempo dar início à sua carreira? As Empresas Jr. associam alunos que prestam diferentes tipos de serviços.

Na hora de colocar a sua ideia em prática, você pode participar de programas que inspiram e promovem o desenvolvimento de iniciativas inovadoras e em- preendedoras disponíveis para a Comunidade USP.

Espaços de convivência e coworking: precisando de um lugar para colocar a sua ideia em prática? Procure os espaços da USP onde você poderá interagir com projetos e organizações ligadas à inovação e ao empreendedorismo.`,
      },
      {
        route: "criar",
        title: "Criar a Empresa",
        color: "#F4C41E",
        buttons: [
          { label: "CIETEC" },
          { label: "ESALQTEC" },
          { label: "HABITS" },
          { label: "SUPERA" },
        ],
        description: `Processo de incubação, criando minha própria empresa

Incubadoras e Parques Tecnológicos: encontre uma rede de apoio para se conectar com outras startups e um local para instalar sua equipe. Atualmente são diferentes espaços, a USP possui 4 incubadoras conveniadas (CIETEC, ESALQTEC, HABITS e SUPERA), além de uma rede de ambientes de inovação no estado de São Paulo que podem abrigar o seu negócio.`,
      },
      {
        route: "aprimorar",
        title: "Aprimorar o Negócio",
        color: "#338C21",
        buttons: [
          { label: "CEPID" },
          { label: "EMBRAPII" },
          { label: "INCT" },
          { label: "NAP" },
          { label: "Centro de Pesquisa em Engenharia" },
          { label: "Centrais Multiusuário" },
        ],
        description: `Fortalecer a empresa e aprimorar tecnologias

Se você está em processo de concepção e desenvol- vimento da sua tecnologia, pode desenvolver parcei- ras com os inúmeros INCT e CEPID , onde será possí- vel aprimorar a sua ideia em conjunto com pesquisa- dores da USP, desenvolver uma tecnologia que se seja protegida por uma patente ou registro de software.

Se você precisa finalizar o desenvolvimento do seu produto, ou testar, serviços especializados ou equipamentos de alta complexidade, verifique essas e outras facilidades no USP Multi.

É possível contar com a ajuda de especialistas e suas competências no momento de desenvolver o seu produto ou serviço. Você pode consultar quais as competências da(o)s pesquisadora(e)s da USP, quem são e como contatá-la(o)s.
`,
      },
      {
        route: "financiamento",
        title: "Financiamento",
        color: "#214E8C",
        buttons: [],
        description: `Buscando e captando investimento

A busca por financiamento deve ser uma tarefa contínua do empreendedor ao longo do ciclo de vida de sua empresa. Usualmente, denomina-se a jornada do financiamento da startup como sendo a jornada paralela ao seu ciclo de vida.

O empreendedor deve incluir no seu playbook, o desenvolvimento de lista de prioridades fontes de recursos que tem interesse em acessar. Normalmente, o empreendedor busca acessar, inicialmente, o capital mais barato com menos exigências contratuais, que usualmente refere-se ao capital de fomento. Capital de fomento refere-se ao financiamento oferecido por organismos públicos para financiamento de novos negócios. Em geral, apresentam condições mais atrativas que as de mercado. Dentre as fontes de fomento para para desenvolvimento de uma tecnologia ainda na fase de projeto ou início da startup, o programa PIPE da (...)`,
      },
    ],
  }),

  computed: {
    currentPage() {
      const id = this.$route.params.id;

      return this.pages.find(({ route }) => route === id);
    },

    currentIndex() {
      const id = this.$route.params.id;
      return this.pages.findIndex(({ route }) => route === id);
    },

    title() {
      return this.currentPage?.title;
    },

    description() {
      return this.currentPage?.description;
    },

    color() {
      return this.currentPage?.color;
    },

    buttons() {
      return this.currentPage?.buttons;
    },

    previous() {
      const currIndex = this.currentIndex;
      return currIndex >= 0 ? this.pages[currIndex - 1]?.route : "";
    },

    next() {
      const currIndex = this.currentIndex;
      return currIndex < this.pages.length
        ? this.pages[currIndex + 1]?.route
        : "";
    },
  },
};
</script>
