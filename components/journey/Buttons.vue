<template>
  <v-div>
    <v-row>
      <v-col class="pt-0">
        <v-row justify="center">
          <v-col cols="6">
            <div class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in primary"
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
        <v-row justify="center">
          <v-col class="pt-0">
            <div v-if="secondary" class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in secondary"
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
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <List :items="filteredDisciplines" />
      </v-col>
    </v-row>
  </v-div>
</template>

<script>
import List from "@/components/deeper_levels/List.vue";

export default {
  components: {
    List,
  },
  props: {
    buttons: {
      required: true,
      validator: (prop) => {
        return prop instanceof Array || prop instanceof Object;
      },
    },
  },

  data: () => ({
    Graduação: [
      {
        id: "QUERO APRENDER!",
        items: [
          "ACH2657 - Empreendedorismo",
          "ACH5508 - Empreendedorismo Tecnológico",
          "8800004 - Empreendedorismo",
          "LOB1251 - Introdução a Inovação Sistemática com TRIZ",
          "LOB1263 - Introdução a Eco-Inovação Tecnológica",
          "LOQ4234 - Empreendedorismo",
          "LOQ4255 - Inovação Tecnológica",
          "SEP0531 - Empreendedorismo",
          "300021 - Empreendedorismo e Planos de Negócios",
          "PCS3579 - Inovação, Tecnologia, Estratégia de Negócio e a Sociedade",
          "PCS3879 - Inovação, Tecnologia, Estratégias de Negócio e a Sociedade",
          "PMR3410 - Empreendedorismo de Base Tecnológica",
          "PRO3416 - Fundamentos de Economia e Empreendimentos",
          "PRO3586 - Fundamentos da Gestão da Inovação",
          "PRO3587 - Inovação, Sociedade e Tecnologia",
          "PRO3612 - Inovação e Empreendedorismo",
          "PSI2617 - Inovação em Engenharia",
          "PSI3465 - Inovação em Engenharia",
          "LCE0136 - Ciência de Dados e Gestão para Empregabilidade Empreendedorismo e Inovação",
          "CGF2069 - Gestão da Inovação e Empreendedorismo",
          "DCO0216 - Propriedade Intelectual e Acesso ao Conhecimento",
          "DCO0220 - Propriedade Intelectual e Acesso ao Conhecimento",
          "DCO0222 - Propriedade Intelectual Aplicada: Função e Disfunção da Propriedade Intelectual em Estudos de Casos",
          "DCV0516 - Questões Atuais de Direito Privado II: Obrigações, Contratos,Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
          "DCV0524 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
          "DEF0529 - Direito da Inovação Tecnológica",
          "DEF0545 - Direito da Inovação Tecnológica",
          "DIN0438 - Direito Internacional da Propriedade Intelectual",
          "DIN0451 - Direito Internacional da Propriedade Intelectual",
          "DPP5204 - Propriedade Intelectual",
          "DPP6003 - Propriedade Intelectual e Acesso à Informação",
          "EAD0910 - Empreendedorismo e Inovação",
          "RAD1105 - Gestão da Inovação",
          "RAD2103 - Empreendedorismo",
          "RAD2221 - Sistema Brasileiro de Inovação: Estrutura, Características e Funcionamento",
          "RAD2227 - Estudo de Casos em Organizações e Inovação",
          "5920938 - Regulamentação e Propriedade Intelectual",
          "5930186 - Empreendedorismo Tecnológico",
          "5952041 - Matemática para Empreendedores",
          "RAD2177 - Gestão da Criatividade",
          "FSL0527 - Inovação e Desenvolvimento Econômico e Social",
          "VCI0210 - Empreendedorismo",
          "ZEB1052 - Gestão, Inovação e Empreendedorismo",
          "ZEB1348 - Fundamentos de Empreendedorismo e Planejamento de Projetos",
          "420300 - Empreendedorismo, Inovação e Propriedade Intelectual",
          "SSC0570 - Empreendedorismo",
          "7600001 - Inovação e Empreendedorismo",
          "7600091 - Empreendedorismo",
          "FCI0761 - Empreendedorismo",
          "MAC0458 - Direito e Software livre",
          "MAC0467 - Empreendedorismo Digital",
          "PRG0004 - Inovação e Empreendedorismo",
          "PRG0005 - Fundamentos em Empreendedorismo",
        ],
      },
      {
        id: "TENHO UMA IDEIA, E AGORA?",
        items: [
          "8800014 - Projetos Especiais em Gestão da Inovação",
          "LOQ4249 - Oficina de Inovação",
          "1800117 - Oficina de Inovação",
          "SEP0529 - Administração e Empreendedorismo / Management and Entrepreneurship",
          "SEP0628 - Projeto Integrado de Inovação",
          "PCS2581 - Negócios em Tempo Real",
          "PCS2590 - Criação e Administração de Empresas de Computação",
          "PEF3111 - Empreendedorismo e Modelos de Negócios",
          "PRO2804 - Projeto, Processo e Gestão da Inovação",
          "PRO3516 - Desenvolvimento de Soluções de Inovação Social",
          "PRO3584 - Projeto, Processo e Gestão da Inovação",
          "LES0370 - Formação Empreendedorial: Capacitação pró-ativa",
          "EAD0712 - Gestão de Pequenas Empresas Empreendedoras",
          "EAD0715 - Gestão da Inovação para a Competitividade Empresarial",
          "EAD0724 - Responsabilidade Social e Empreendedorismo Social",
          "EAD0906 - Inovação Social e Empreendedorismo Social na Prática",
          "RAD2310 - Empreendedorismo Social e Finanças Sociais",
          "5962042 - Inteligência Competitiva com Enfoque Empreendedor II",
          "5962126 - Inteligência Competitiva com Enfoque Empreendedor I",
          "420200 - Gestão de Projetos em Inovação",
          "SCC0300 - Projeto Empreendedor I",
          "SCC0302 - Projeto Empreendedor II",
          "SSC0595 - Projeto Empreendedor I (turma 1)",
          "SSC0596 - Projeto Empreendedor II (turma 2)",
          "SSC0675 - Projeto Empreendedor I (turma 1)",
          "SSC0676 - Projeto Empreendedor II (turma 2)",
          "PRG0016 - Laboratório de Inovação e Empreendedorismo",
        ],
      },
      {
        id: "PRECISO TESTAR MINHA IDEIA!",
        items: [
          "ACH1575 - Inovação em Serviços de Lazer e Turismo",
          "ACH1596 - Intervenções Profissionais em Turismo Empreendimentos Turísticos e Desenvolvimento",
          "ACH2758 - Inovação em Têxtil e Moda",
          "ACH3088 - Empreendedorismo em Gerontologia",
          "CJE0656 - Empreendedorismo em Jornalismo",
          "CRP0305 - Empreendedorismo e Assessoria de Relações Públicas",
          "CRP0494 - Trabalho de Campo em Empreendimento Turístico",
          "CRP0528 - Desafios da inovação no Turismo",
          "CRP0560 - Empreendedorismo e Gestão da Inovação Aplicados ao Turismo",
          "ERG0111 - Inovação e Empreendedorismo em Saúde e Enfermagem",
          "ACH1538 - Consultoria e Empreendedorismo em Lazer e Turismo",
          "1800313 - Sustentabilidade, Inovação e Empreendedorismo I",
          "PCC2541 - Inovação Tecnológica na Produção de Edifícios",
          "PMI3817 - Empreendedorismo e Inovação na Cadeia Mineral",
          "PMR2540 - Empreendimento de Base Tecnológica em Mecatrônica",
          "PRO3588 - Inovação, Empreendedorismo e Gestão de Serviços em Saúde",
          "LCF0600 - Empreendedorismo e Inovação Circular em Bioeconomia",
          "RAD2318 - Região Metropolitana de Ribeirão Preto: Sociedade, Economia, Tecnologia e Inovação",
          "5910192 - Empreendedorismo para Física Médica",
          "5913003 - Inovação Tecnológica em Biomedicina",
          "5920943 - Empreendedorismo em Biotecnologia Animal",
          "MSP4040 - Inovação & Empreendedorismo em Saúde",
          "MSP4053 - Inovação e empreendedorismo na medicina",
          "MSP4061 - Empreendedorismo e Inovação em Saúde",
          "RCB0314 - Inovação e Empreendedorismo em Biotecnologia",
          "RIB0301 - Ciência, Invenção, Inovação e Lazer",
          "RIB1100 - Inovação em Saúde e Empreendedorismo",
          "2500032 - Inovação e Empreendedorismo em Saúde",
          "ZEB0426 - Empreendedorismo e Projetos no Agronegócio",
          "ZEB0551 - Gestão e Empreendedorismo no Agronegócio",
          "110450 - Inovação e Qualidade na Cadeia Produtiva do Pescado",
          "SCC0209 - Empreendedores em Informática",
        ],
      },
      {
        id: "TÓPICOS AVANÇADOS EM EMPREENDEDORISMO",
        items: [
          "ACH2008 - Empreendedorismo em Informática",
          "LCE0136 - Ciência de Dados e Gestão para Empregabilidade, Empreendedorismo e Inovação",
          "DCO0216 - Propriedade Intelectual e Acesso ao Conhecimento",
          "DCO0220 - Propriedade Intelectual e Acesso ao Conhecimento",
          "DCO0222 - Propriedade Intelectual Aplicada: Função e Disfunção da Propriedade Intelectual em Estudos de Casos",
          "DCV0516 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
          "DCV0524 - Questões Atuais de Direito Privado II: Obrigações, Contratos, Responsabilidade Civil, Direitos Reais, Propriedade Intelectual, Família e Sucessões",
          "DEF0529 - Direito da Inovação Tecnológica",
          "DEF0545 - Direito da Inovação Tecnológica",
          "DIN0438 - Direito Internacional da Propriedade Intelectual",
          "DIN0451 - Direito Internacional da Propriedade Intelectual",
          "DPP5204 - Propriedade Intelectual",
          "DPP6003 - Propriedade Intelectual e Acesso à Informação",
          "5920938 - Regulamentação e Propriedade Intelectual",
          "5952041 - Matemática para Empreendedores",
          "420300 - Empreendedorismo, Inovação e Propriedade Intelectual",
          "MAC0458 - Direito e Software livre",
        ],
      },
    ],
    PósGraduação: [
      {
        id: "Quero aprender!",
        items: [
          "6025827 - Gestão de Inovação de Produtos",
          "EAD5837 - Gestão da Inovação Tecnológica na Empresa",
          "EAD5952-4 - Estratégia e Inovação em Corporações Multinacionais",
          "EAE5820 - Desenvolvimento e Inovação",
          "EAP5006 - Empreendedorismo Inovador",
          "EAP5010 - Inovação e Novos Negócios",
          "GIA5004 - Empreendedorismo e Planos de Negócios",
          "ICB5738 - Gestão de Projetos em Inovação",
          "MAC6909-2 - Empreendedorismo Digital",
          "PRO5804-3 - Gestão Estratégica da Inovação",
          "RAD5005 - Administração de Pesquisa, Desenvolvimento e Inovação nas Organizações",
          "RAD5043 - Empreendedorismo e Inovação",
          "SRB5038-1 - Oficina de Inovação e Empreendedorismo",
          "VCI5788 - Empreendedorismo",
          "EAP5028 - Inovação Global",
          "FLS5157 - Desenvolvimento, Instituições e Políticas Públicas de Ciência, Tecnologia e Inovação",
          "SEP5848 - Gestão Integrada da Inovação e Tecnologia",
          "EAD5979 - Inovação Aberta na Economia Digital",
          "EAD5970 - Inovação Ambidestra, Condicionantes e Desempenhos",
          "EAP5021 - Inovação de Modelo de Negócio",
          "EAD5968 - Inovação Global",
          "SEP5847 - Inovação, Mudança Produtiva e Desenvolvimento Humano",
          "EAD5981 - Transferência de Conhecimento e Difusão de Inovação",
          "EAD5980 - Ecossistemas Empreendedores em Economias em Transição",
          "5915771 - Empreendedorismo",
          "MAI5027 - Empreendedorismo",
          "PBI5229 - Empreendedorismo de Base Tecnológica",
          "EAD5987 - Empreendedorismo Digital e Territórios Criativos Inteligentes",
          "EAP5038 - Empreendedorismo Digital e Territórios Criativos Inteligentes",
        ],
      },
      {
        id: "Tenho uma ideia, e agora?",
        items: [
          "EAD5806 - Arquiteturas Organizacionais, Inovação e Internacionalização",
          "EAD5959 - Empreendedorismo Social e Negócios Socioambientais",
          "EAP5015 - Marketing para Empreendedorismo",
          "EAP5016 - Finanças para empreendedorismo",
          "EAP5040 - Comportamento do Consumidor no Contexto da Inovação",
          "SEP5838 - Estratégia e Modelagem de Empresas para Inovação Colaborativa",
          "EDF5114 - Habilidades Sócio-Emocionais, Inovação e Avaliação de Impactos Sociais",
          "PRO5962 - Indústrias Culturais e Criativas, Inovação e Desenvolvimento Tecnológico",
          "SEP5837 - Inovação e Sustentabilidade na Manufatura",
          "EAP5024 - Comportamento do Consumidor e Qualidade de Vida Voltada para o Ambiente Empreendedor",
          "EAP5023 - Criatividade, Resiliência e suas Interfaces com o Empreendedorismo",
          "EAD5996 - Efetividade Empreendedora",
          "EAP5030 - Efetividade Empreendedora",
          "PCS5769 - Empreendedorismo para Cientistas e Engenheiros de Computação",
          "EAP5007 - Empreendedorismo Social e Negócios Socioambientais",
          "ADM4009 - Finanças para Empreendedores",
          "EAD5982 - Habilidades Empreendedoras",
          "EAP5025 - Transformações do Trabalho e Empreendedorismo no Mundo Contemporâneo",
        ],
      },
      {
        id: "Preciso testar minha ideia!",
        items: [
          "EAD5887 - Gestão Estratégica e Inovação para a Sustentabilidade",
          "EAD5919 - Administração da Inovação em Produtos e Processos",
          "EAP5001-2 - Lean Startup e Modelo de Desenvolvimento de Produtos",
          "EMP5500-3 - Tecnologia, Inovação e Empreendedorismo em Saúde e Enfermagem",
          "ENS5921-2 - Tecnologias e Inovação nas Práticas de Cuidados em Atenção Primária de Saúde",
          "GIA5007 - Gestão da Inovação e da Propriedade Intelectual no Agronegócio",
          "ODC5823 - Inovação Tecnológica para o Diagnóstico e a Terapêutica em Cirurgia e Traumatologia Buco-Maxilo-Faciais",
          "PCC5963 - Cadeia Produtiva da Construção: Tecnologia, Sustentabilidade e Inovação",
          "SIN5019-1 - Laboratório de Inovação em Sistemas de Informação",
          "SRB5025-2 - Tópicos em Funcionalidade, Tecnologia Assistiva e Inovação em Reabilitação",
          "PRO5963 - Abordagens para Inovação em Produtos, Serviços e Processos",
          "DSG5016 - Abordagens para inovação em produtos, serviços e processos",
          "PRO5766 - Análise e Projeto de Inovação Organizacional",
          "GIA5032 - Demandas Tecnológicas e Inovação em Sistemas de Produção Animal Baseados em Pastagens",
          "PCC5964 - Desempenho e Inovação de Sistemas Prediais Hidráulicos",
          "PRO5857 - Desenvolvimento de Projeto em Organização e Gestão da Inovação",
          "BTC5853 - Empreendedorismo e Inovação em Saúde",
          "BAB5711 - Estratégias de Inovação em Biologia Oral",
          "GOS5725 - Gestão da Inovação em Saúde",
          "MAN5758 - Gestão da Inovação Tecnológica Relacionada ao Perioperatório",
          "GIA5027 - Gestão e Inovação na Indústria Aquícola",
          "PSP5711 - Inovação em Saúde Materna: Evidências, Direitos e Políticas Públicas",
          "GIA5034 - Inovação na Avicultura",
          "ENO5955 - Inovação no Processo Educativo na Era Digital",
          "PCC5975 - Inovação Tecnológica e Industrialização na Construção Civil",
          "8055752 - Inovação, tecnologia e empreendedorismo em Materiais Odontológicos e Reabilitação Oral",
          "EAP5026 - Laboratório de Inovação e Empreendedorismo",
          "ODO5786 - Saúde Digital e Telessaúde: Tecnologia e Inovação em Saúde e Educação",
          "VPS5709 - Segurança de Alimentos: Temas em Gestão e Inovação",
          "EAP5013 - Seminário de Inovação e Empreendedorismo I",
          "EAP5039 - Seminário de Inovação e Empreendedorismo II",
          "SHS5965 - Tópicos Especiais em Hidráulica e Saneamento: Oportunidades Interdisciplinares de Inovação e Empreendedorismo Científico",
        ],
      },
      {
        id: "Tópicos avançados em empreendedorismo",
        items: [
          "6025774 - Desenvolvimento de Sistemas de Liberação para a Via Nasal, Ocular e Absorção Pulmonar: uma Inovação na Administração de Fármacos Peptídicos e Protéicos",
          "EAD5865 - Estratégia Tecnológica na Empresa, Inovação e Internacionalização",
          "RAD5032-2 - Internacionalização de Empresas e Inovação",
          "EAD5966 - Ciência, Tecnologia e Inovação: a Dimensão Internacional",
          "BTC5839 - Empreendedorismo, Inovação e Propriedade Intelectual - Módulo I",
          "TNA5786 - Gestão da Propriedade Intelectual Aplicada à Produção do Conhecimento, Inovação Tecnológica, Pesquisa e Desenvolvimento",
          "DCO5873 - Propriedade Intelectual",
          "EAD5994 - Gestão de propriedade intelectual",
          "EAP5029 - Gestão de propriedade intelectual",
          "DIN5888 - Os Fundamentos do Direito Internacional da Propriedade Intelectual",
        ],
      },
    ],
    secondaryCategories: [
      {
        id: "INCUBADORAS DA USP",
        items: [
          "CIETEC - Centro de Inovação, Empreendedorismo e Tecnologia",
          "ESALQTec - Incubadora de Empresas Agrozootécnicas de Piracicaba",
          "HABITs - Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
          "Supera - Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
          "Supera Parque de Inovação e Tecnologia",
        ],
      },
      {
        id: "INCUBADORAS EXTERNAS DA USP",
        items: [
          "Acematão - Incubadora de Matão",
          "Agende - incubadora Tecnológica de Empresas Guarulhos",
          "CEDIN - Centro de desenvolvimento de Indústrias",
          "CIE - Centro Incubador de Empresas",
          "CIEM - Centro Incubador de Empresas de Marília Miguel Silva",
          "CINET - Centro Incubador de Empresas (Parq Tec)",
          "Design-Inn - Incubadora de Desing (Parq Tec)",
          "IEB - Incubadora Empresarial de Bebedouro",
          "IEL - Incubadora de Empresas de Leme (Parq Tec)",
          "INCAMP - Incubadora de Empresas de Base Tecnológica da UNICAMP",
          "Incubadora de Ciência, Tecnologia e Inovação de Limeira",
          "Incubadora de Empresas de Americana",
          "Incubadora de Empresas de Araras",
          "Incubadora de Empresas de Jundiaí",
          "Incubadora de Empresas de Lins",
          "Incubadora de Empresas de Olímpia",
          "Incubadora de Empresas do Mackenzie",
          "Incubadora de Empresas José João Sans",
          "Incubadora de Negócios da ESPM",
          "Incubadora Hubiz",
          "Incubadora Inova do IFSP",
          "Incubadora ITUFABC",
          "Incubadora Municipal de Empresas de Barueri",
          "Incubadora Profor",
          "Incubadora Tecnológica Univap",
          "Incubadora Zumbitek da Universidade Zumbi dos Palmares ",
          "INOVAJAB - Unesp Campus de Jaboticabal",
          "INTEPP - Incubadora Tecnológica de Presidente Prudente",
          "Parque Científico e Tecnológico da UNICAMP",
          "Parque Eco Tecnológico Damha",
          "Parque Tecnológico Botucatu",
          "Parque Tecnológico CTI-TEC",
          "Parque Tecnológico da CIATEC",
          "Parque Tecnológico de Limeira",
          "Parque Tecnológico de São José Do Rio Preto",
          "Parque Tecnológico de São José Dos Campos (PqTec)",
          "Parque Tecnológico Univap",
          "Plataforma Kaeydos",
          "Polis de Tecnologia CPQD",
          "PROCULTURA - Incubadora Cultural de São João de Boa Vista",
          "Prospecta - Incubadora Tecnológica de Botucatu",
          "PTS - Parque Tecnológico de Santos",
          "PTS - Parque Tecnológico de Sorocaba",
          "São Carlos Science Park - Parque Tecnológico de São Carlos (Parq Tec)",
          "Softnet - Centro Incubador de Empresas de Software  (Parq Tec)",
        ],
      },
      {
        id: "FOMENTO",
        items: ["PIPE", "PITE", "Catalisa", "Programas CNPq", "Finep"],
      },
      { id: "INVESTIDORES ANJO", items: ["Fea Angels", "Poli Angels"] },
      {
        id: "EMBRAPII",
        items: ["Esalq/usp", "IFSC", "Poli", "Tecnogreen Poli"],
      },
    ],

    selectedButtonPrimary: undefined,
    selectedButtonSecondary: undefined,
  }),

  computed: {
    selectedText() {
      return this.selectedButton || "selecione um item acima";
    },

    filteredDisciplines() {
      const primaryButton = this.selectedButtonPrimary;
      const secondaryButton = this.selectedButtonSecondary;

      if (primaryButton == "GRADUAÇÃO" || primaryButton == "PÓS-GRADUAÇÃO") {
        if (secondaryButton == undefined) {
          // devolve todas as categorias, preciso fazer um concat
        } else {
          const index = this.Graduação.findIndex((item) => {
            return item.id == secondaryButton;
          });
          return primaryButton == "GRADUAÇÃO"
            ? this.Graduação[index].items
            : this.PósGraduação[index].items;
        }
      } else if (primaryButton == undefined && secondaryButton != undefined) {
        const index = this.secondaryCategories.findIndex((item) => {
          return item.id == secondaryButton;
        });
        console.log(this.secondaryCategories[index].items);
        return this.secondaryCategories[index].items;
      }
    },

    primary() {
      return this.buttons.primary;
    },

    secondary() {
      return this.buttons.secondary || this.buttons;
    },
  },

  methods: {
    select({ target }) {
      if (
        target.innerText == "GRADUAÇÃO" ||
        target.innerText == "PÓS-GRADUAÇÃO"
      ) {
        this.selectedButtonPrimary = target.innerText;
        this.selectedButtonSecondary = undefined;
      } else {
        this.selectedButtonSecondary = target.innerText;
      }
    },
  },
};
</script>
