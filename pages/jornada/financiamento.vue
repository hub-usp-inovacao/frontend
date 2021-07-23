<template>
  <div>
    <Step
      title="Financiamento"
      :description="description"
      color="#214E8C"
      :buttons="buttons"
      previous="aprimorar"
      previous-color="#338C21"
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
      `1. A busca por financiamento deve ser uma tarefa contínua do empreendedor ao
longo do ciclo de vida de sua empresa, esta é uma jornada paralela ao seu ciclo
de vida.`,
      `2. Empreendedores com interesse em desenvolver seu negócio a partir de uma
tecnologia a ser aplicada em um determinado setor econômico, pode se associar
a empresas da indústria de aplicação de sua tecnologia e acessar financiamento
de P&D&I da EMBRAPII. Essa fonte de fomento é direcionada para projetos de
P&D&I desenvolvidos em parceria entre empresas e ICTs credenciados em
diferentes áreas de competência.`,
      `3. O empreendedor deve incluir no seu playbook, uma lista das fontes de recursos
que tem interesse em acessar. Inicialmente o empreendedor busca acessar o
capital mais barato com menos exigências contratuais, que constituem-se no
capital de fomento. É um financiamento oferecido por organismos públicos para
suportar novos negócios com condições mais atrativas que as de mercado. Estes
fomentos funcionam em fluxo continuo (FAPESP) ou por meio de editais
(SEBRAE, CNPQ, FINEP )`,
      `O empreendedor também pode acessar o Investimento Anjo, oferecido pelo
investidor pessoa física com interesse em investir no estágio inicial da startups,
muitas vezes, antes mesmo do modelo de negócio ter sido validado e da primeira
venda. Além dos recursos financeiros, o investidor anjo oferece mentoria que,
muitas vezes, é tão valiosa quanto o capital financeiro. O Empreendedor pode
entrar em contato com as associações de investidores anjo criadas por ex-alunos
de algumas unidades da USP ou outras associações de anjos do mercado`,
      `Em um estágio mais avançado do ciclo de vida da startup, com histórico de
vendas, produto validado pelo mercado com interesse em tracionar seu negócio,
o empreendedor pode acessar os fundos de investimentos Venture Capital
especializados em Early Stage (pre seed e seed). A melhor forma de acessar
esses fundos de investimento é se conectar com as associações de investidores
anjos que possuem forte conexão com Venture Capital.`,
    ],
    route: "financiamento",
    buttons: [
      { label: "EMBRAPII" },
      { label: "Fomento" },
      { label: "Investidores Anjo" },
    ],

    items: {
      FOMENTO: [
        { title: "PIPE" },
        { title: "PITE" },
        { title: "Catalisa" },
        { title: "Programas CNPq" },
        { title: "Finep" },
      ],
      "INVESTIDORES ANJO": [{ title: "Fea Angels" }, { title: "Poli Angels" }],
      EMBRAPII: [
        { title: "Esalq/usp" },
        { title: "IFSC" },
        { title: "Poli" },
        { title: "Tecnogreen Poli" },
      ],
    },

    selectedButtonSecondary: undefined,
  }),

  computed: {
    filteredDisciplines() {
      const secondaryButton = this.selectedButtonSecondary;

      if (secondaryButton != undefined) {
        return this.items[secondaryButton];
      } else {
        return [];
      }
    },
  },

  methods: {
    select({ target }) {
      const text = target.innerText;
      this.selectedButtonSecondary = text;
    },
  },
};
</script>
