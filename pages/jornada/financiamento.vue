<template>
  <div>
    <Step
      title="Financiamento"
      :description="description"
      color="#214E8C"
      :buttons="buttons"
      previous="aprimorar"
      previous-color="#338C21"
      next=""
      :items="filteredItems"
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
    buttons: [
      { label: "EMBRAPII" },
      { label: "Fomento" },
      { label: "Investidores Anjo" },
      { label: "EARLY STAGE" },
      { label: "VENTURE CAPITAL" },
    ],

    items: {
      FOMENTO: [
        "PIPE FAPESP",
        "PITE FAPESP",
        "Catalisa SEBRAE",
        "Programas CNPq",
        "Finep",
      ],
      "INVESTIDORES ANJO": [
        "Fea Angels",
        "Poli Angels",
        "Anjos do Brasil",
        "Gavea Angels",
      ],
      EMBRAPII: [
        "Biocontroladores de Pragas Agrícolas",
        "Biofotônica e Instrumentação",
        "Construção Ecoeficiente",
        "Química Verde",
        "Tecnologias Associadas a Powertrain",
        "Aços e Ligas Especiais",
        "Agricultura Digital",
        "Agroindústria do Café",
        "Biofármacos e Fármacos",
        "Bioquímica De Renováveis",
        "Biossintéticos, Fibras e Intensificação De Processos Químicos",
        "Biotecnologia",
        "Computação Industrial",
        "Comunicações Avançadas",
        "Comunicações Digitais",
        "Desenvolvimento de Medicamentos",
        "Eletrônica Embarcada",
        "Eletroquímica Industrial",
        "Engenharia de Petróleo e Gás",
        "Equipamentos Para Internet e Computação Móvel",
        "Fibras Florestais",
        "Integridade Estrutural",
        "Inteligência Artificial",
        "Manufatura a Laser",
        "Manufatura Integrada",
        "Materiais",
        "Materiais de Alto Desempenho",
        "Materiais Funcionais",
        "Materiais Poliméricos e Nanomateriais",
        "Metalurgia e Materiais",
        "Mobilidade e Sistemas Inteligentes",
        "Polímeros",
        "Polímeros e Nanomateriais",
        "Processos Biotecnológicos",
        "Produtos Conectados",
        "Recursos Energéticos Distribuídos",
        "Sistema Robóticos e Automação",
        "Sistemas de Sensoriamento",
        "Sistemas Embarcados",
        "Sistemas Embarcados Complexos",
        "Sistemas Embarcados e Mobilidade Digital",
        "Sistemas Inteligentes",
        "Sistemas Inteligentes de Energia",
        "Sistemas para Automação da Manufatura",
        "Sistemas Para Manufatura",
        "Software e Automação",
        "Software Para Sistemas Ciberfísicos",
        "Soluções Agroalimentares",
        "Soluções Computacionais em Engenharia",
        "Tecnologia de Materiais Sustentáveis",
        "Tecnologia e Engenharia de Alimentos",
        "Tecnologia Química Industrial",
        "Tecnologias Agroindutriais",
        "Tecnologias Aplicadas a Powertrain",
        "Tecnologias e Sistemas Veiculares",
        "Tecnologias em Química Verde",
        "Tecnologias em Saúde",
        "Tecnologias Energéticas Industriais",
        "Tecnologias Inovadoras de Refrigeração",
        "Tecnologias Metal-Mecânicas",
        "Tecnologias para Processos de Manufatura",
        "Tecnologias para Produção Mais Limpa",
        "Transformação da Biomassa",
        "Transmissão de Potência",
      ],
      "EARLY STAGE": [
        "RedPoint ",
        "Astella Investimentos ",
        "Indicator Capital",
        "Kaszek Ventures ",
        "SP Ventures",
      ],
      "VENTURE CAPITAL": [
        "2b Capital",
        "ACON Investments",
        "Actis Capital LLC",
        "Advent International",
        "Angra Partners",
        "Antera Gestão de Recursos",
        "Aqua Capital Consultoria Ltda",
        "Aram Capital Gestão de Recursos Ltda",
        "Artemisia",
        "Astella Investimentos",
        "Axxon Group",
        "Banco Modal",
        "Baraúna Gestora de Recursos Ltda",
        "Bela Vista Investimentos",
        "Blue like an Orange Gestora de Recursos Ltda",
        "BNP Paribas Asset Management",
        "Bossa Nova Investimentos e Administração S.A",
        "BR Opportunities Gestora de Fundos Ltda",
        "Brain Ventures",
        "BRAM Bradesco Asset Management S.A. DTVM",
        "Bratus Capital",
        "Bresco Gestão e Consultoria Ltda",
        "BRKB DTVM AS",
        "Brookfield Brasil Ltda",
        "BRPP Gestão de Produtos Estruturados",
        "BRZ Investimentos",
        "BTG Pactual",
        "CASAFORTE Investimentos S.A.",
        "CDPQ Brasil",
        "Cedro Capital",
        "Claritas Administração de Recursos Ltda",
        "Coller Capital",
        "Confrapar - Participações e Pesquisa S/A",
        "Crescera Investimentos",
        "CRP Companhia de Participações",
        "CSN Inova Ventures",
        "CVC Advisers Latam Representação e Consultoria Ltda",
        "Cypress Associates",
        "Darby Overseas Investments",
        "DEG Brasil - KFW Bankengruppe",
        "DGF Investimentos",
        "Domo Invest",
        "Dynamo Venture Capital",
        "EB Capital",
        "EDP Ventures Brasil S/A",
        "Einstein",
        "Elogroup Consulting Ltda",
        "FinHealth",
        "FIR Capital Partners",
        "FUNDEPAR Gestão de Investimentos LTDA",
        "Fundo Pitanga",
        "G5 Gestora de Recursos Ltda",
        "Gávea Investimentos",
        "GEF Brasil Investimentos",
        "General Atlantic",
        "Grão Venture Capital",
        "Grupo Stratus",
        "GTIS Partners Brasil Gestão, Consultoria em",
        "H.I.G Capital",
        "Hancock Asset Management Brasil Ltda",
        "Indicator Invest. e Serv. de Gestão Empresarial Ltda",
        "Invest Tech Participações e Investimentos",
        "Investimage Asset Management",
        "Investimentos e Participações Ltda",
        "Jardim Botânico Partners",
        "Kaeté Investimentos",
        "Kinea Private Equity Investimentos",
        "KPTL (ex-Inseed / A5)",
        "Lacan Investimentos e Participações Ltda",
        "Latache Gestão de Recursos Ltda.",
        "Leblon Equities Gestão de Recursos Ltda.",
        "Lexington Partners",
        "Lightrock",
        "Lions Trust",
        "Mantiq Investimentos",
        "MarcoZero",
        "Matterhorn Infraestrutura Gestão de Investimentos Ltda",
        "Mauá Capital Investimentos Alternativos",
        "Mercado Libre",
        "Monashees Capital",
        "MSW Capital",
        "Mubadala Consultoria Financeira Ltda",
        "Nebraska Capital",
        "Neo Investimentos",
        "O3 Capital",
        "Oria Capital",
        "Partners Group",
        "Pátria Investimentos",
        "Performa Investimentos",
        "Portcapital Gestora de Recursos e Consultoria",
        "Qualcomm Ventures",
        "Queluz Gestão de Recursos Financeiros Ltda",
        "REAG Investimentos",
        "Redpoint eVentures",
        "Rio Bravo Investimentos",
        "Signal Capital Investimentos Ltda",
        "Siguler Guff Gestora de Investimentos Brasil Ltda",
        "Sociedade Beneficente Israelita Brasileira Hospital Albert",
        "Southern Cross Group",
        "SP Ventures",
        "Spectra Investimentos",
        "StepStone do Brasil Consultoria Financeira",
        "TCG Gestor LTDA.",
        "Temasek Brasil Consultoria e Participações LTDA.",
        "TMG Capital",
        "TreeCorp Investimentos",
        "Triaxis Capital",
        "Trivèlla Investimentos",
        "Trivèlla M3 Investimentos",
        "Valetec Capital",
        "Valora Investimentos",
        "Vectis Gestão de Recursos",
        "Vila Rica Capital",
        "Vinci Capital Gestora de Recursos Ltda",
        "Vision Brazil Investments",
        "VOLPE Consultoria Econômica Ltda",
        "Vox Capital",
        "Warburg Pincus",
        "Wayra Brasil Desenvolvedora e Apoiadora de Projetos Ltda",
        "WBGI",
        "Xp Allocation Asset Management",
      ],
    },

    selectedButtonSecondary: undefined,
  }),

  computed: {
    filteredItems() {
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
