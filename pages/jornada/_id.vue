<template>
  <div>
    <Step
      :title="title"
      :description="description"
      :color="color"
      :buttons="buttons"
      :next="next"
      :previous="previous"
      :next-color="nextColor"
      :previous-color="previousColor"
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
        nextColor: "#E46926",
        buttons: {
          primary: [{ label: "Graduação" }, { label: "Pós-Graduação" }],
          secondary: [
            { label: "Quero aprender!" },
            { label: "Tenho uma ideia, e agora?" },
            { label: "Preciso testar minha ideia!" },
            { label: "Tópicos avançados em empreendedorismo" },
          ],
        },
        description: [
          {
            line: `Para aprender um pouco mais sobre inovação e empreendedorismo, curse as
disciplinas com potencial de geração de ideias, projetos, produtos e tecnologia
relacionadas a novos negócios, oferecidas por diferentes institutos. Hoje a USP
tem em sua grade cerca de 100 disciplinas de graduação e quase 40 disciplinas
de pós-graduação voltadas para os temas de inovação e empreendedorismo, que
podem ser encontradas em: https://hubusp.inovacao.usp.br/educacao`,
          },
          {
            line: `Você pode navegar pelas disciplinas de acordo com o nível de maturidade que
você busca em empreendedorismo e inovação:`,
          },
        ],
      },
      {
        route: "pratica",
        title: "A Ideia na Prática",
        color: "#E46926",
        nextColor: "#F4C41E",
        previousColor: "#C0161B",
        buttons: [
          { label: "Empresa Jr." },
          { label: "Ideação" },
          { label: "Grupos e Iniciativas Estudantis" },
          { label: "Entidade Associada" },
          { label: "Entidade Estudantil" },
          { label: "Espaço/coworking" },
        ],
        description: [
          {
            line: `Quer encontrar uma galera que esteja a fim de apoiar e trabalhar nas mesmas
causas que você? Busque a entidade estudantil com a qual você mais se
identifica e junte-se a essa turma:`,
          },
          {
            line: `Quer trabalhar com projetos ligados a inovação e empreendedorismo e ao mesmo
tempo dar início à sua carreira? As Empresas Júnior são associações de alunos
que prestam diferentes tipos de serviços, participe.`,
          },
          {
            line: `Na hora de colocar a sua ideia em prática, você pode participar de programas que
inspiram e promovem o desenvolvimento de iniciativas inovadoras e
empreendedoras disponíveis para a Comunidade USP:`,
          },
          {
            line: `Na hora de colocar a sua ideia em prática, você pode participar de programas que
inspiram e promovem o desenvolvimento de iniciativas inovadoras e
empreendedoras disponíveis para a Comunidade USP:`,
          },
          {
            line: `Precisando de um lugar para colocar a sua ideia em prática? Procure os espaços
da Universidade onde você poderá interagir com projetos e organizações ligadas
à inovação e ao empreendedorismo`,
          },
        ],
      },
      {
        route: "criar",
        title: "Criar a Empresa",
        color: "#F4C41E",
        nextColor: "#338C21",
        previousColor: "#E46926",
        buttons: [
          { label: "CIETEC" },
          { label: "ESALQTEC" },
          { label: "HABITS" },
          { label: "SUPERA" },
          { label: "Incubadoras e Parques Tecnológico" },
        ],
        description: [
          {
            line: `Encontre uma rede de apoio para se conectar com outras startups e um local para
instalar sua equipe em uma das 4 Incubadoras e do Parque Tecnológico da USP.`,
          },
          {
            line: `Há no estado de São Paulo uma diversificada rede de ambientes de inovação
com aceleradoras, incubadoras e parques que também podem abrigar o seu
negócio`,
          },
        ],
      },
      {
        route: "aprimorar",
        title: "Aprimorar o Negócio",
        color: "#338C21",
        nextColor: "#214E8C",
        previousColor: "#F4C41E",
        buttons: [
          { label: "CEPID" },
          { label: "EMBRAPII" },
          { label: "INCT" },
          { label: "NAP" },
          { label: "Centro de Pesquisa em Engenharia" },
          { label: "Centrais Multiusuário" },
        ],
        description: [
          {
            line: `Se você está em processo de concepção e desenvolvimento da sua tecnologia,
pode desenvolver parceiras com os inúmeros INCT e CEPID , onde será possível
aprimorar a sua ideia em conjunto com pesquisadores da USP, desenvolver uma
tecnologia que se seja protegida por uma patente ou registro de software`,
          },
          {
            line: `É possível contar com a ajuda de especialistas e suas competências no momento
de desenvolver o seu produto ou serviço.`,
          },
          {
            line: `Você pode consultar quais as competências da(o)s pesquisadora(e)s da USP e os serviços e equipamentos
disponíveis em seus laboratórios.`,
          },
          {
            line: `Se você precisa finalizar o desenvolvimento do seu produto, ou testar, serviços
especializados ou equipamentos de alta complexidade, verifique essas e outras
facilidades no USP Multi`,
          },
        ],
      },
      {
        route: "financiamento",
        title: "Financiamento",
        color: "#214E8C",
        previousColor: "#338C21",
        buttons: [
          { label: "Fomento" },
          { label: "Investidores Anjo" },
          { label: "Capital de Risco" },
        ],
        description: [
          {
            line: `1. A busca por financiamento deve ser uma tarefa contínua do empreendedor ao
longo do ciclo de vida de sua empresa, esta é uma jornada paralela ao seu ciclo
de vida.`,
          },
          {
            line: `2. Empreendedores com interesse em desenvolver seu negócio a partir de uma
tecnologia a ser aplicada em um determinado setor econômico, pode se associar
a empresas da indústria de aplicação de sua tecnologia e acessar financiamento
de P&D&I da EMBRAPII. Essa fonte de fomento é direcionada para projetos de
P&D&I desenvolvidos em parceria entre empresas e ICTs credenciados em
diferentes áreas de competência.`,
          },
          {
            line: `3. O empreendedor deve incluir no seu playbook, uma lista das fontes de recursos
que tem interesse em acessar. Inicialmente o empreendedor busca acessar o
capital mais barato com menos exigências contratuais, que constituem-se no
capital de fomento. É um financiamento oferecido por organismos públicos para
suportar novos negócios com condições mais atrativas que as de mercado. Estes
fomentos funcionam em fluxo continuo (FAPESP) ou por meio de editais
(SEBRAE, CNPQ, FINEP )`,
          },
          {
            line: `O empreendedor também pode acessar o Investimento Anjo, oferecido pelo
investidor pessoa física com interesse em investir no estágio inicial da startups,
muitas vezes, antes mesmo do modelo de negócio ter sido validado e da primeira
venda. Além dos recursos financeiros, o investidor anjo oferece mentoria que,
muitas vezes, é tão valiosa quanto o capital financeiro. O Empreendedor pode
entrar em contato com as associações de investidores anjo criadas por ex-alunos
de algumas unidades da USP ou outras associações de anjos do mercado`,
          },
          {
            line: `Em um estágio mais avançado do ciclo de vida da startup, com histórico de
vendas, produto validado pelo mercado com interesse em tracionar seu negócio,
o empreendedor pode acessar os fundos de investimentos Venture Capital
especializados em Early Stage (pre seed e seed). A melhor forma de acessar
esses fundos de investimento é se conectar com as associações de investidores
anjos que possuem forte conexão com Venture Capital.`,
          },
        ],
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

    nextColor() {
      return this.currentPage?.nextColor;
    },

    previousColor() {
      return this.currentPage?.previousColor;
    },
  },
};
</script>
