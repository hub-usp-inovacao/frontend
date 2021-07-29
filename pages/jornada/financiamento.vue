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
        { title: "PIPE FAPESP" },
        { title: "PITE FAPESP" },
        { title: "Catalisa SEBRAE" },
        { title: "Programas CNPq" },
        { title: "Finep" },
      ],
      "INVESTIDORES ANJO": [
        { title: "Fea Angels" },
        { title: "Poli Angels" },
        { title: "Anjos do Brasil" },
        { title: "Gavea Angels" },
      ],
      EMBRAPII: [
        { title: "Biocontroladores de Pragas Agrícolas" },
        { title: "Biofotônica e Instrumentação" },
        { title: "Construção Ecoeficiente" },
        { title: "Química Verde" },
        { title: "Tecnologias Associadas a Powertrain" },
        { title: "Aços e Ligas Especiais" },
        { title: "Agricultura Digital" },
        { title: "Agroindústria do Café" },
        { title: "Biofármacos e Fármacos" },
        { title: "Bioquímica De Renováveis" },
        {
          title:
            "Biossintéticos, Fibras e Intensificação De Processos Químicos",
        },
        { title: "Biotecnologia" },
        { title: "Computação Industrial" },
        { title: "Comunicações Avançadas" },
        { title: "Comunicações Digitais" },
        { title: "Desenvolvimento de Medicamentos" },
        { title: "Eletrônica Embarcada" },
        { title: "Eletroquímica Industrial" },
        { title: "Engenharia de Petróleo e Gás" },
        { title: "Equipamentos Para Internet e Computação Móvel" },
        { title: "Fibras Florestais" },
        { title: "Integridade Estrutural" },
        { title: "Inteligência Artificial" },
        { title: "Manufatura a Laser" },
        { title: "Manufatura Integrada" },
        { title: "Materiais" },
        { title: "Materiais de Alto Desempenho" },
        { title: "Materiais Funcionais" },
        { title: "Materiais Poliméricos e Nanomateriais" },
        { title: "Metalurgia e Materiais" },
        { title: "Mobilidade e Sistemas Inteligentes" },
        { title: "Polímeros" },
        { title: "Polímeros e Nanomateriais" },
        { title: "Processos Biotecnológicos" },
        { title: "Produtos Conectados" },
        { title: "Recursos Energéticos Distribuídos" },
        { title: "Sistema Robóticos e Automação" },
        { title: "Sistemas de Sensoriamento" },
        { title: "Sistemas Embarcados" },
        { title: "Sistemas Embarcados Complexos" },
        { title: "Sistemas Embarcados e Mobilidade Digital" },
        { title: "Sistemas Inteligentes" },
        { title: "Sistemas Inteligentes de Energia" },
        { title: "Sistemas para Automação da Manufatura" },
        { title: "Sistemas Para Manufatura" },
        { title: "Software e Automação" },
        { title: "Software Para Sistemas Ciberfísicos" },
        { title: "Soluções Agroalimentares" },
        { title: "Soluções Computacionais em Engenharia" },
        { title: "Tecnologia de Materiais Sustentáveis" },
        { title: "Tecnologia e Engenharia de Alimentos" },
        { title: "Tecnologia Química Industrial" },
        { title: "Tecnologias Agroindutriais" },
        { title: "Tecnologias Aplicadas a Powertrain" },
        { title: "Tecnologias e Sistemas Veiculares" },
        { title: "Tecnologias em Química Verde" },
        { title: "Tecnologias em Saúde" },
        { title: "Tecnologias Energéticas Industriais" },
        { title: "Tecnologias Inovadoras de Refrigeração" },
        { title: "Tecnologias Metal-Mecânicas" },
        { title: "Tecnologias para Processos de Manufatura" },
        { title: "Tecnologias para Produção Mais Limpa" },
        { title: "Transformação da Biomassa" },
        { title: "Transmissão de Potência" },
      ],
      "EARLY STAGE": [
        { title: "RedPoint " },
        { title: "Astella Investimentos " },
        { title: "Indicator Capital" },
        { title: "Kaszek Ventures " },
        { title: "SP Ventures" },
      ],
      "VENTURE CAPITAL": [
        { title: "2b Capital" },
        { title: "ACON Investments" },
        { title: "Actis Capital LLC" },
        { title: "Advent International" },
        { title: "Angra Partners" },
        { title: "Antera Gestão de Recursos" },
        { title: "Aqua Capital Consultoria Ltda" },
        { title: "Aram Capital Gestão de Recursos Ltda" },
        { title: "Artemisia" },
        { title: "Astella Investimentos" },
        { title: "Axxon Group" },
        { title: "Banco Modal" },
        { title: "Baraúna Gestora de Recursos Ltda" },
        { title: "Bela Vista Investimentos" },
        { title: "Blue like an Orange Gestora de Recursos Ltda" },
        { title: "BNP Paribas Asset Management" },
        { title: "Bossa Nova Investimentos e Administração S.A" },
        { title: "BR Opportunities Gestora de Fundos Ltda" },
        { title: "Brain Ventures" },
        { title: "BRAM Bradesco Asset Management S.A. DTVM" },
        { title: "Bratus Capital" },
        { title: "Bresco Gestão e Consultoria Ltda" },
        { title: "BRKB DTVM AS" },
        { title: "Brookfield Brasil Ltda" },
        { title: "BRPP Gestão de Produtos Estruturados" },
        { title: "BRZ Investimentos" },
        { title: "BTG Pactual" },
        { title: "CASAFORTE Investimentos S.A." },
        { title: "CDPQ Brasil" },
        { title: "Cedro Capital" },
        { title: "Claritas Administração de Recursos Ltda" },
        { title: "Coller Capital" },
        { title: "Confrapar - Participações e Pesquisa S/A" },
        { title: "Crescera Investimentos" },
        { title: "CRP Companhia de Participações" },
        { title: "CSN Inova Ventures" },
        { title: "CVC Advisers Latam Representação e Consultoria Ltda" },
        { title: "Cypress Associates" },
        { title: "Darby Overseas Investments" },
        { title: "DEG Brasil - KFW Bankengruppe" },
        { title: "DGF Investimentos" },
        { title: "Domo Invest" },
        { title: "Dynamo Venture Capital" },
        { title: "EB Capital" },
        { title: "EDP Ventures Brasil S/A" },
        { title: "Einstein" },
        { title: "Elogroup Consulting Ltda" },
        { title: "FinHealth" },
        { title: "FIR Capital Partners" },
        { title: "FUNDEPAR Gestão de Investimentos LTDA" },
        { title: "Fundo Pitanga" },
        { title: "G5 Gestora de Recursos Ltda" },
        { title: "Gávea Investimentos" },
        { title: "GEF Brasil Investimentos" },
        { title: "General Atlantic" },
        { title: "Grão Venture Capital" },
        { title: "Grupo Stratus" },
        { title: "GTIS Partners Brasil Gestão, Consultoria em" },
        { title: "H.I.G Capital" },
        { title: "Hancock Asset Management Brasil Ltda" },
        { title: "Indicator Invest. e Serv. de Gestão Empresarial Ltda" },
        { title: "Invest Tech Participações e Investimentos" },
        { title: "Investimage Asset Management" },
        { title: "Investimentos e Participações Ltda" },
        { title: "Jardim Botânico Partners" },
        { title: "Kaeté Investimentos" },
        { title: "Kinea Private Equity Investimentos" },
        { title: "KPTL (ex-Inseed / A5)" },
        { title: "Lacan Investimentos e Participações Ltda" },
        { title: "Latache Gestão de Recursos Ltda." },
        { title: "Leblon Equities Gestão de Recursos Ltda." },
        { title: "Lexington Partners" },
        { title: "Lightrock" },
        { title: "Lions Trust" },
        { title: "Mantiq Investimentos" },
        { title: "MarcoZero" },
        { title: "Matterhorn Infraestrutura Gestão de Investimentos Ltda" },
        { title: "Mauá Capital Investimentos Alternativos" },
        { title: "Mercado Libre" },
        { title: "Monashees Capital" },
        { title: "MSW Capital" },
        { title: "Mubadala Consultoria Financeira Ltda" },
        { title: "Nebraska Capital" },
        { title: "Neo Investimentos" },
        { title: "O3 Capital" },
        { title: "Oria Capital" },
        { title: "Partners Group" },
        { title: "Pátria Investimentos" },
        { title: "Performa Investimentos" },
        { title: "Portcapital Gestora de Recursos e Consultoria" },
        { title: "Qualcomm Ventures" },
        { title: "Queluz Gestão de Recursos Financeiros Ltda" },
        { title: "REAG Investimentos" },
        { title: "Redpoint eVentures" },
        { title: "Rio Bravo Investimentos" },
        { title: "Signal Capital Investimentos Ltda" },
        { title: "Siguler Guff Gestora de Investimentos Brasil Ltda" },
        { title: "Sociedade Beneficente Israelita Brasileira Hospital Albert" },
        { title: "Southern Cross Group" },
        { title: "SP Ventures" },
        { title: "Spectra Investimentos" },
        { title: "StepStone do Brasil Consultoria Financeira" },
        { title: "TCG Gestor LTDA." },
        { title: "Temasek Brasil Consultoria e Participações LTDA." },
        { title: "TMG Capital" },
        { title: "TreeCorp Investimentos" },
        { title: "Triaxis Capital" },
        { title: "Trivèlla Investimentos" },
        { title: "Trivèlla M3 Investimentos" },
        { title: "Valetec Capital" },
        { title: "Valora Investimentos" },
        { title: "Vectis Gestão de Recursos" },
        { title: "Vila Rica Capital" },
        { title: "Vinci Capital Gestora de Recursos Ltda" },
        { title: "Vision Brazil Investments" },
        { title: "VOLPE Consultoria Econômica Ltda" },
        { title: "Vox Capital" },
        { title: "Warburg Pincus" },
        { title: "Wayra Brasil Desenvolvedora e Apoiadora de Projetos Ltda" },
        { title: "WBGI" },
        { title: "Xp Allocation Asset Management" },
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
