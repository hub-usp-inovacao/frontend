<template>
  <div>
    <Step
      title="Aprimorar o Negócio"
      :description="description"
      color="#338C21"
      :buttons="buttons"
      next="financiamento"
      previous="criar"
      next-color="#214E8C"
      previous-color="#F4C41E"
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
      `Se você está em processo de concepção e desenvolvimento da sua tecnologia,
pode desenvolver parceiras com os inúmeros INCT e CEPID , onde será possível
aprimorar a sua ideia em conjunto com pesquisadores da USP, desenvolver uma
tecnologia que se seja protegida por uma patente ou registro de software`,
      `É possível contar com a ajuda de especialistas e suas competências no momento
de desenvolver o seu produto ou serviço.`,
      `Você pode consultar quais as competências da(o)s pesquisadora(e)s da USP e os serviços e equipamentos
disponíveis em seus laboratórios.`,
      `Se você precisa finalizar o desenvolvimento do seu produto, ou testar, serviços
especializados ou equipamentos de alta complexidade, verifique essas e outras
facilidades no USP Multi`,
    ],
    buttons: [
      { label: "CEPID" },
      { label: "INCT" },
      { label: "Centrais Multiusuário" },
    ],

    items: {
      CEPID: [
        "CEGH-CEL - Centro de Estudos do Genoma Humano e Células-Tronco",
        "CEM - Centro de Estudos da Metrópole",
        "CeMEAI - Centro de Ciências Matemáticas Aplicadas a Indústria",
        "Cepof - Centro de Pesquisas de Óptica e Fotônica",
        "CeRTEV - Centro de Pesquisa, Educação e Inovação em Vidros",
        "CIBFar - Centro de Pesquisa e Inovação em Biodiversidade e Fármacos",
        "CPBEC - Centro de Pesquisa Aplicada em Bem-Estar e Comportamento Humano",
        "CRID - Centro de Pesquisa em Doenças Inflamatórias",
        "CTC - Centro de Terapia Celular",
        "FoRC - Centro de Pesquisa em Alimentos",
        "NeuroMat - Centro de Pesquisa, Inovação e Difusão em Neuromatemática",
        "NEV - Centro para o Estudo da Violência",
        "RCGI - Centro de Pesquisa para Inovação em Gás",
        "REDOXOME - Centro de Pesquisa de Processos Redox em Biomedicina",
      ],
      INCT: [
        "INCT de Análise Integrada do Risco Ambiental (INAIRA)",
        "INCT de Astrofísica",
        "INCT de Células-Tronco e Terapia Celular",
        "INCT Envelhecimento e Doenças Genéticas: Genômica e Metagenômica",
        "INCT de Eletrônica Orgânica",
        "INCT de Engenharia da Irrigação",
        "INCT de Estudos do Meio Ambiente",
        "INCT de Fluidos Complexos",
        "INCT de Investigação em Imunologia (iii)",
        "INCT de Processos Redox em Biomedicina (REDOXOMA)",
        "INCT de Psiquiatria do Desenvolvimento para Crianças e Adolescentes (INPD)",
        "INCT de Semioquímicos na Agricultura",
        "INCT de Técnicas Analíticas Aplicadas a Exploração de Petróleo e Gás (Petrotec)",
        "INCT do Bioetanol",
        "INCT em Óptica e Fotônica (INOF)",
        "INCT em Sistemas Embarcados Críticos (SEC)",
        "INCT para Sistemas Autônomos Cooperativos (InSAC)",
        "INCT sobre Terras Raras",
        "INCT sobre Violência, Democracia e Segurança Cidadã",
      ],
      "CENTRAIS MULTIUSUÁRIO": [
        "TPN - Central Multiusuário Tanque de Provas Numérico",
        "CENTRAL IOT - Centro Interdisciplinar em Tecnologias Interativas - Central de Manufatura Avançada em Internet das Coisas",
        "LCT - Central Multiusuário - Laboratório de Caracterização Tecnológica",
        "NANOSTAR - Espalhamento de raios X a baixo ângulo -SAXS-Nanostar",
        "CEGH-CEL - Centro de Pesquisa sobre o Genoma Humano e Células Tronco",
        "CN - Centr",
        "CEMMO - Central de Espectrometria de Massas de Micromoléculas Orgânicas",
        "CBAI - Central Multiusuário de Bioquímica e Análise Instrumental",
        "CEQIL - Centro de Excelência em Quantificação e Identificação de Lipídios",
        "CMGPSJ - Central Multiusuário do Grupo de Pesquisa em Soldagem e Junção",
        "IFSC-USP MULTI - Central Multiusuário IFSC-USP",
        "CENTRAL FSP - Faculdade de Saúde Pública",
        "CMAQ - Central Multiusuário de Análises Químicas",
        "CEFAP-USP - Centro de Facilidades de Apoio à Pesquisa",
        "CMBC - Central Multiusuário de Biologia Celular da Faculdade de Zootecnia e Engenharia de Alimentos da USP",
        "MQA - Metrologia e Qualidade na Agropecuária",
        "CMLPB - Central Multiusuário - Espectrômetro de Massas do LPB",
        "CM-IRMS CENA - Central Multiusuário de Espectrometria de Massas de Razão Isotópica",
        "InTRA - Integrações Tecnológicas em Análises de Rochas e Fluidos",
        "MultMatBio - Central Multiusuário de Caracterização de Materiais para Biossistemas",
        "NAPREI - Central Multiusuário em Redes Elétricas Inteligentes e Qualidade de Energia",
        "LMEM-FCFUSP - Laboratório Multiusuário de Espectrometria de Massas - Faculdade de Ciências Farmacêuticas - USP",
        "USPMag - Laboratório de Paleomagnetismo e Magnetismo de Rochas",
        "LME - LABORATORIO DE MICROESTRUTURA E ECOEFICIENCIA DE MATERIAIS",
        "LABMICRO - Laboratório Multiusuário de Microscopia Eletrônica",
        "CROB - Centro de Robótica da USP",
        "CALOQ - Central Analítica do LOQ (EEL / USP)",
        "DempsterMSLab - Laboratório de Espectrometria de Massas Dempster",
        "EMAE - Estação Meteorológica Automática Experimental",
        "CADI - Centro Avançado em Diagnóstico por Imagem",
        "BioPira - Central Multiusuário de Biologia Molecular e Bioinformática de Pirassununga",
        "GECIFEX-EEFERP/USP - GECIFEX: Grupo de Estudos em ciências fisiológicas e exercício",
        "P2LMATKIELIV - Espectrômetro de massa de razão isotópica",
        "CESM FMRP-USP - Central de Equipamentos e Serviços de Multiusuários da FMRP/USP",
        "DMC - Laboratório de Durabilidade de Materiais e Componentes",
        "CAQI - Central de Análises Químicas Instrumentais",
        "NeME-FOA-Unesp - Central Multiusuário do Núcleo de estudos em Medicina Endodôntica",
        "CIP - Centro Integrado de Pesquisas - FOB/USP",
        "CM-ENERQ - Central Multiusuário em Redes Elétricas Inteligentes e Qualidade da Energia",
        "CM-RCGI - Research Centre for Gas Innovation",
        "CNET - Centro de Nanotecnologia e Engenharia Tecidual",
        "Rede PREMiUM - Rede PREMiUM",
        "CEPAME - Centro de Pesquisa e Análise de Materiais de Engenharia",
        "LCr-IFUSP - Laboratório de Cristalografia-IFUSP",
        "FORC - Central de Equipamentos Multiusuários do CEPID - Food Research Center",
        "LAMFI - Laboratório de Análise de Materiais por Feixes Iônicos",
        "LIAREC - Laboratório de Imagens de Alta Resolução e Estudos Celulares",
        "CA - Centro Analítico de Instrumentação da Universidade de São Paulo - Central Analítica",
        "ECOMULTI - Laboratório Multiusuário de Ultrassom e Ecocardiografia de Pequenos Animais",
        "CPCE - Centro de Pesquisa Clínica e Epidemiológica",
        "UNIPEX - Unidade de Pesquisa Experimental",
        "UNIPEX_2 - Unidade de Pesquisa Experimental (UNIPEX)",
        "CEO - Central de Embarcações Oceanográficas",
        "LFS - Laboratório de Fenômenos de Superfície",
        "IPENMULTI - CENTRAL IPEN MULTIUSUÁRIO",
        "LNM - Laboratório de Nutrição e Metabolismo ",
        "CMFQA - Central Multiusuário de Físico-Química dos Alimentos",
        "BROMATOZAZ - Central Multiusuário de Bromatologia",
        "VMA - Vias Metabólicas na Agricultura",
        "LMSeq - Laboratório  Multiusuario de Sequenciamento de Ácidos Nucléicos",
        "LabMass - Laboratório de Espectrometria de Massas",
        "CDB - Centro para Documentação da Biodiversidade",
        "LEGaL - Laboratório de Espectrometria Gama e Luminescência",
        "MultiSed - Central Multiusuário de Geologia Sedimentar",
        "CMGeo - Central Multiusuário Geoanalitica",
        "LNA - Laboratório de Nanomateriais e Aplicações",
        "LFF - Central Multiusuário do Laboratório de Filmes Finos",
        "SIGLA - CEGH-CEL - Centro de Pesquisa sobre o Genoma Humano e Células-Tronco",
        "MAT - Materiais FOB",
        "FOUSPMulti - Central Multiusuários da Faculdade de Odontologia da Universidade de São Paulo",
        "CORE - Centro Oceanográfico de Registros Estratigráficos",
        "LaMeF - Laboratório de Metalurgia Física",
        "HEATGROUP - Grupo de Pesquisa em Transferência de Calor",
        "LMMC - Laboratório Multiusuário de Microscopia Confocal",
        "BIOTECNOLOGIA-ESALQ - Laboratório Multiusuários Centralizado de Genômica Funcional Aplicada à Agropecuária e Agroenergia",
        "CMAA - Central Multiusuário de Análises Ambientais",
        "MULTIÔMICAS - Laboratório Multiusuários de Proteômica, Metabolômica e Lipidômica",
        "LME - Laboratorio de Microscopia eletronica",
        "FCF-IPEN - Centro de Imagens Pré-Clínicas - Faculdade de Ciências Farmacêuticas",
        "MicroPET - Central Multiusuário de Imagens Pré-Clínicas FCF-IPEN",
        "MiSeqFCF - Sequenciador Illumina MiSeq - FCF",
        "CMFCF - Central Multiusuário da FCF",
        "CaMicro - Central Multiusuário de Caracterização em Microondas e Ondas Milimétricas",
        "GMSIE - Central Multiusuario Grupo de Mecânica do Sólidos e Impacto de Estruturas",
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
