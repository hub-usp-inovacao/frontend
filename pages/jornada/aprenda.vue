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
    categories: {
      "QUERO APRENDER!": [
        { title: "ACH2657 - Empreendedorismo" },
        { title: "ACH5508 - Empreendedorismo Tecnológico" },
        { title: "8800004 - Empreendedorismo" },
        { title: "LOB1251 - Introdução a Inovação Sistemática com TRIZ" },
        { title: "LOB1263 - Introdução a Eco-Inovação Tecnológica" },
        { title: "LOQ4234 - Empreendedorismo" },
        { title: "LOQ4255 - Inovação Tecnológica" },
        { title: "SEP0531 - Empreendedorismo" },
        { title: "300021 - Empreendedorismo e Planos de Negócios" },
        {
          title:
            "PCS3579 - Inovação, Tecnologia, Estratégia de Negócio e a Sociedade",
        },
        {
          title:
            "PCS3879 - Inovação, Tecnologia, Estratégias de Negócio e a Sociedade",
        },
        { title: "PMR3410 - Empreendedorismo de Base Tecnológica" },
        { title: "PRO3416 - Fundamentos de Economia e Empreendimentos" },
        { title: "PRO3586 - Fundamentos da Gestão da Inovação" },
        { title: "PRO3587 - Inovação, Sociedade e Tecnologia" },
        { title: "PRO3612 - Inovação e Empreendedorismo" },
        { title: "PSI2617 - Inovação em Engenharia" },
        { title: "PSI3465 - Inovação em Engenharia" },
        {
          title:
            "LCE0136 - Ciência de Dados e Gestão para Empregabilidade Empreendedorismo e Inovação",
        },
        { title: "CGF2069 - Gestão da Inovação e Empreendedorismo" },
        {
          title: "DCO0216 - Propriedade Intelectual e Acesso ao Conhecimento",
        },
        {
          title: "DCO0220 - Propriedade Intelectual e Acesso ao Conhecimento",
        },
        {
          title:
            "DCO0222 - Propriedade Intelectual Aplicada: Função e Disfunção da Propriedade Intelectual em Estudos de Casos",
        },
        {
          title:
            "DCV0516 - Questões Atuais de Direito Privado II: Obrigações, Contratos,Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
        },
        {
          title:
            "DCV0524 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
        },
        { title: "DEF0529 - Direito da Inovação Tecnológica" },
        { title: "DEF0545 - Direito da Inovação Tecnológica" },
        {
          title: "DIN0438 - Direito Internacional da Propriedade Intelectual",
        },
        {
          title: "DIN0451 - Direito Internacional da Propriedade Intelectual",
        },
        { title: "DPP5204 - Propriedade Intelectual" },
        { title: "DPP6003 - Propriedade Intelectual e Acesso à Informação" },
        { title: "EAD0910 - Empreendedorismo e Inovação" },
        { title: "RAD1105 - Gestão da Inovação" },
        { title: "RAD2103 - Empreendedorismo" },
        {
          title:
            "RAD2221 - Sistema Brasileiro de Inovação: Estrutura, Características e Funcionamento",
        },
        { title: "RAD2227 - Estudo de Casos em Organizações e Inovação" },
        { title: "5920938 - Regulamentação e Propriedade Intelectual" },
        { title: "5930186 - Empreendedorismo Tecnológico" },
        { title: "5952041 - Matemática para Empreendedores" },
        { title: "RAD2177 - Gestão da Criatividade" },
        { title: "FSL0527 - Inovação e Desenvolvimento Econômico e Social" },
        { title: "VCI0210 - Empreendedorismo" },
        { title: "ZEB1052 - Gestão, Inovação e Empreendedorismo" },
        {
          title:
            "ZEB1348 - Fundamentos de Empreendedorismo e Planejamento de Projetos",
        },
        {
          title:
            "420300 - Empreendedorismo, Inovação e Propriedade Intelectual",
        },
        { title: "SSC0570 - Empreendedorismo" },
        { title: "7600001 - Inovação e Empreendedorismo" },
        { title: "7600091 - Empreendedorismo" },
        { title: "FCI0761 - Empreendedorismo" },
        { title: "MAC0458 - Direito e Software livre" },
        { title: "MAC0467 - Empreendedorismo Digital" },
        { title: "PRG0004 - Inovação e Empreendedorismo" },
        { title: "PRG0005 - Fundamentos em Empreendedorismo" },
      ],
      "TENHO UMA IDEIA, E AGORA?": [
        { title: "8800014 - Projetos Especiais em Gestão da Inovação" },
        { title: "LOQ4249 - Oficina de Inovação" },
        { title: "1800117 - Oficina de Inovação" },
        {
          title:
            "SEP0529 - Administração e Empreendedorismo / Management and Entrepreneurship",
        },
        { title: "SEP0628 - Projeto Integrado de Inovação" },
        { title: "PCS2581 - Negócios em Tempo Real" },
        {
          title: "PCS2590 - Criação e Administração de Empresas de Computação",
        },
        { title: "PEF3111 - Empreendedorismo e Modelos de Negócios" },
        { title: "PRO2804 - Projeto, Processo e Gestão da Inovação" },
        { title: "PRO3516 - Desenvolvimento de Soluções de Inovação Social" },
        { title: "PRO3584 - Projeto, Processo e Gestão da Inovação" },
        { title: "LES0370 - Formação Empreendedorial: Capacitação pró-ativa" },
        { title: "EAD0712 - Gestão de Pequenas Empresas Empreendedoras" },
        {
          title:
            "EAD0715 - Gestão da Inovação para a Competitividade Empresarial",
        },
        {
          title: "EAD0724 - Responsabilidade Social e Empreendedorismo Social",
        },
        {
          title:
            "EAD0906 - Inovação Social e Empreendedorismo Social na Prática",
        },
        { title: "RAD2310 - Empreendedorismo Social e Finanças Sociais" },
        {
          title:
            "5962042 - Inteligência Competitiva com Enfoque Empreendedor II",
        },
        {
          title:
            "5962126 - Inteligência Competitiva com Enfoque Empreendedor I",
        },
        { title: "420200 - Gestão de Projetos em Inovação" },
        { title: "SCC0300 - Projeto Empreendedor I" },
        { title: "SCC0302 - Projeto Empreendedor II" },
        { title: "SSC0595 - Projeto Empreendedor I (turma 1)" },
        { title: "SSC0596 - Projeto Empreendedor II (turma 2)" },
        { title: "SSC0675 - Projeto Empreendedor I (turma 1)" },
        { title: "SSC0676 - Projeto Empreendedor II (turma 2)" },
        { title: "PRG0016 - Laboratório de Inovação e Empreendedorismo" },
      ],
      "PRECISO TESTAR MINHA IDEIA!": [
        { title: "ACH1575 - Inovação em Serviços de Lazer e Turismo" },
        {
          title:
            "ACH1596 - Intervenções Profissionais em Turismo Empreendimentos Turísticos e Desenvolvimento",
        },
        { title: "ACH2758 - Inovação em Têxtil e Moda" },
        { title: "ACH3088 - Empreendedorismo em Gerontologia" },
        { title: "CJE0656 - Empreendedorismo em Jornalismo" },
        {
          title: "CRP0305 - Empreendedorismo e Assessoria de Relações Públicas",
        },
        { title: "CRP0494 - Trabalho de Campo em Empreendimento Turístico" },
        { title: "CRP0528 - Desafios da inovação no Turismo" },
        {
          title:
            "CRP0560 - Empreendedorismo e Gestão da Inovação Aplicados ao Turismo",
        },
        {
          title: "ERG0111 - Inovação e Empreendedorismo em Saúde e Enfermagem",
        },
        {
          title: "ACH1538 - Consultoria e Empreendedorismo em Lazer e Turismo",
        },
        { title: "1800313 - Sustentabilidade, Inovação e Empreendedorismo I" },
        { title: "PCC2541 - Inovação Tecnológica na Produção de Edifícios" },
        { title: "PMI3817 - Empreendedorismo e Inovação na Cadeia Mineral" },
        {
          title: "PMR2540 - Empreendimento de Base Tecnológica em Mecatrônica",
        },
        {
          title:
            "PRO3588 - Inovação, Empreendedorismo e Gestão de Serviços em Saúde",
        },
        {
          title:
            "LCF0600 - Empreendedorismo e Inovação Circular em Bioeconomia",
        },
        {
          title:
            "RAD2318 - Região Metropolitana de Ribeirão Preto: Sociedade, Economia, Tecnologia e Inovação",
        },
        { title: "5910192 - Empreendedorismo para Física Médica" },
        { title: "5913003 - Inovação Tecnológica em Biomedicina" },
        { title: "5920943 - Empreendedorismo em Biotecnologia Animal" },
        { title: "MSP4040 - Inovação & Empreendedorismo em Saúde" },
        { title: "MSP4053 - Inovação e empreendedorismo na medicina" },
        { title: "MSP4061 - Empreendedorismo e Inovação em Saúde" },
        { title: "RCB0314 - Inovação e Empreendedorismo em Biotecnologia" },
        { title: "RIB0301 - Ciência, Invenção, Inovação e Lazer" },
        { title: "RIB1100 - Inovação em Saúde e Empreendedorismo" },
        { title: "2500032 - Inovação e Empreendedorismo em Saúde" },
        { title: "ZEB0426 - Empreendedorismo e Projetos no Agronegócio" },
        { title: "ZEB0551 - Gestão e Empreendedorismo no Agronegócio" },
        {
          title: "110450 - Inovação e Qualidade na Cadeia Produtiva do Pescado",
        },
        { title: "SCC0209 - Empreendedores em Informática" },
      ],
      "TÓPICOS AVANÇADOS EM EMPREENDEDORISMO": [
        { title: "ACH2008 - Empreendedorismo em Informática" },
        {
          title:
            "LCE0136 - Ciência de Dados e Gestão para Empregabilidade, Empreendedorismo e Inovação",
        },
        { title: "DCO0216 - Propriedade Intelectual e Acesso ao Conhecimento" },
        { title: "DCO0220 - Propriedade Intelectual e Acesso ao Conhecimento" },
        {
          title:
            "DCO0222 - Propriedade Intelectual Aplicada: Função e Disfunção da Propriedade Intelectual em Estudos de Casos",
        },
        {
          title:
            "DCV0516 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
        },
        {
          title:
            "DCV0524 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
        },
        { title: "DEF0529 - Direito da Inovação Tecnológica" },
        { title: "DEF0545 - Direito da Inovação Tecnológica" },
        { title: "DIN0438 - Direito Internacional da Propriedade Intelectual" },
        { title: "DIN0451 - Direito Internacional da Propriedade Intelectual" },
        { title: "DPP5204 - Propriedade Intelectual" },
        { title: "DPP6003 - Propriedade Intelectual e Acesso à Informação" },
        { title: "5920938 - Regulamentação e Propriedade Intelectual" },
        { title: "5952041 - Matemática para Empreendedores" },
        {
          title:
            "420300 - Empreendedorismo, Inovação e Propriedade Intelectual",
        },
        { title: "MAC0458 - Direito e Software livre" },
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
