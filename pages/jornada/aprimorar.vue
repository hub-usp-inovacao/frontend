<template>
  <div>
    <Step
      title="Aprimorar o Negócio"
      :description="description"
      color="#338C21"
      :buttons="buttons"
      next="criar"
      previous="pratica"
      next-color="#214E8C"
      previous-color="#F4C41E"
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
    route: "financiamento",
    buttons: [
      { label: "CEPID" },
      { label: "INCT" },
      { label: "Centrais Multiusuário" },
    ],

    items: {
      CEPID: [
        {
          title:
            "CEGH-CEL - Centro de Estudos do Genoma Humano e Células-Tronco",
        },
        { title: "CEM - Centro de Estudos da Metrópole" },
        {
          title:
            "CeMEAI - Centro de Ciências Matemáticas Aplicadas a Indústria",
        },
        { title: "Cepof - Centro de Pesquisas de Óptica e Fotônica" },
        { title: "CeRTEV - Centro de Pesquisa, Educação e Inovação em Vidros" },
        {
          title:
            "CIBFar - Centro de Pesquisa e Inovação em Biodiversidade e Fármacos",
        },
        {
          title:
            "CPBEC - Centro de Pesquisa Aplicada em Bem-Estar e Comportamento Humano",
        },
        { title: "CRID - Centro de Pesquisa em Doenças Inflamatórias" },
        { title: "CTC - Centro de Terapia Celular" },
        { title: "FoRC - Centro de Pesquisa em Alimentos" },
        {
          title:
            "NeuroMat - Centro de Pesquisa, Inovação e Difusão em Neuromatemática",
        },
        { title: "NEV - Centro para o Estudo da Violência" },
        { title: "RCGI - Centro de Pesquisa para Inovação em Gás" },
        {
          title:
            "REDOXOME - Centro de Pesquisa de Processos Redox em Biomedicina",
        },
      ],
      INCT: [
        { title: "INCT de Análise Integrada do Risco Ambiental (INAIRA)" },
        { title: "INCT de Astrofísica" },
        { title: "INCT de Células-Tronco e Terapia Celular" },
        {
          title:
            "INCT Envelhecimento e Doenças Genéticas: Genômica e Metagenômica",
        },
        { title: "INCT de Eletrônica Orgânica" },
        { title: "INCT de Engenharia da Irrigação" },
        { title: "INCT de Estudos do Meio Ambiente" },
        { title: "INCT de Fluidos Complexos" },
        { title: "INCT de Investigação em Imunologia (iii)" },
        { title: "INCT de Processos Redox em Biomedicina (REDOXOMA)" },
        {
          title:
            "INCT de Psiquiatria do Desenvolvimento para Crianças e Adolescentes (INPD)",
        },
        { title: "INCT de Semioquímicos na Agricultura" },
        {
          title:
            "INCT de Técnicas Analíticas Aplicadas a Exploração de Petróleo e Gás (Petrotec)",
        },
        { title: "INCT do Bioetanol" },
        { title: "INCT em Óptica e Fotônica (INOF)" },
        { title: "INCT em Sistemas Embarcados Críticos (SEC)" },
        { title: "INCT para Sistemas Autônomos Cooperativos (InSAC)" },
        { title: "INCT sobre Terras Raras" },
        { title: "INCT sobre Violência, Democracia e Segurança Cidadã" },
      ],
      "CENTRAIS MULTIUSUÁRIO": [
        { title: "TPN - Central Multiusuário Tanque de Provas Numérico" },
        {
          title:
            "CENTRAL IOT - Centro Interdisciplinar em Tecnologias Interativas - Central de Manufatura Avançada em Internet das Coisas",
        },
        {
          title:
            "LCT - Central Multiusuário - Laboratório de Caracterização Tecnológica",
        },
        {
          title:
            "NANOSTAR - Espalhamento de raios X a baixo ângulo -SAXS-Nanostar",
        },
        {
          title:
            "CEGH-CEL - Centro de Pesquisa sobre o Genoma Humano e Células Tronco",
        },
        { title: "CN - Centr" },
        {
          title:
            "CEMMO - Central de Espectrometria de Massas de Micromoléculas Orgânicas",
        },
        {
          title:
            "CBAI - Central Multiusuário de Bioquímica e Análise Instrumental",
        },
        {
          title:
            "CEQIL - Centro de Excelência em Quantificação e Identificação de Lipídios",
        },
        {
          title:
            "CMGPSJ - Central Multiusuário do Grupo de Pesquisa em Soldagem e Junção",
        },
        { title: "IFSC-USP MULTI - Central Multiusuário IFSC-USP" },
        { title: "CENTRAL FSP - Faculdade de Saúde Pública" },
        { title: "CMAQ - Central Multiusuário de Análises Químicas" },
        { title: "CEFAP-USP - Centro de Facilidades de Apoio à Pesquisa" },
        {
          title:
            "CMBC - Central Multiusuário de Biologia Celular da Faculdade de Zootecnia e Engenharia de Alimentos da USP",
        },
        { title: "MQA - Metrologia e Qualidade na Agropecuária" },
        {
          title:
            "CMLPB - Central Multiusuário - Espectrômetro de Massas do LPB",
        },
        {
          title:
            "CM-IRMS CENA - Central Multiusuário de Espectrometria de Massas de Razão Isotópica",
        },
        {
          title:
            "InTRA - Integrações Tecnológicas em Análises de Rochas e Fluidos",
        },
        {
          title:
            "MultMatBio - Central Multiusuário de Caracterização de Materiais para Biossistemas",
        },
        {
          title:
            "NAPREI - Central Multiusuário em Redes Elétricas Inteligentes e Qualidade de Energia",
        },
        {
          title:
            "LMEM-FCFUSP - Laboratório Multiusuário de Espectrometria de Massas - Faculdade de Ciências Farmacêuticas - USP",
        },
        {
          title:
            "USPMag - Laboratório de Paleomagnetismo e Magnetismo de Rochas",
        },
        {
          title:
            "LME - LABORATORIO DE MICROESTRUTURA E ECOEFICIENCIA DE MATERIAIS",
        },
        {
          title:
            "LABMICRO - Laboratório Multiusuário de Microscopia Eletrônica",
        },
        { title: "CROB - Centro de Robótica da USP" },
        { title: "CALOQ - Central Analítica do LOQ (EEL / USP)" },
        {
          title:
            "DempsterMSLab - Laboratório de Espectrometria de Massas Dempster",
        },
        { title: "EMAE - Estação Meteorológica Automática Experimental" },
        { title: "CADI - Centro Avançado em Diagnóstico por Imagem" },
        {
          title:
            "BioPira - Central Multiusuário de Biologia Molecular e Bioinformática de Pirassununga",
        },
        {
          title:
            "GECIFEX-EEFERP/USP - GECIFEX: Grupo de Estudos em ciências fisiológicas e exercício",
        },
        { title: "P2LMATKIELIV - Espectrômetro de massa de razão isotópica" },
        {
          title:
            "CESM FMRP-USP - Central de Equipamentos e Serviços de Multiusuários da FMRP/USP",
        },
        {
          title: "DMC - Laboratório de Durabilidade de Materiais e Componentes",
        },
        { title: "CAQI - Central de Análises Químicas Instrumentais" },
        {
          title:
            "NeME-FOA-Unesp - Central Multiusuário do Núcleo de estudos em Medicina Endodôntica",
        },
        { title: "CIP - Centro Integrado de Pesquisas - FOB/USP" },
        {
          title:
            "CM-ENERQ - Central Multiusuário em Redes Elétricas Inteligentes e Qualidade da Energia",
        },
        { title: "CM-RCGI - Research Centre for Gas Innovation" },
        { title: "CNET - Centro de Nanotecnologia e Engenharia Tecidual" },
        { title: "Rede PREMiUM - Rede PREMiUM" },
        {
          title:
            "CEPAME - Centro de Pesquisa e Análise de Materiais de Engenharia",
        },
        { title: "LCr-IFUSP - Laboratório de Cristalografia-IFUSP" },
        {
          title:
            "FORC - Central de Equipamentos Multiusuários do CEPID - Food Research Center",
        },
        {
          title:
            "LAMFI - Laboratório de Análise de Materiais por Feixes Iônicos",
        },
        {
          title:
            "LIAREC - Laboratório de Imagens de Alta Resolução e Estudos Celulares",
        },
        {
          title:
            "CA - Centro Analítico de Instrumentação da Universidade de São Paulo - Central Analítica",
        },
        {
          title:
            "ECOMULTI - Laboratório Multiusuário de Ultrassom e Ecocardiografia de Pequenos Animais",
        },
        { title: "CPCE - Centro de Pesquisa Clínica e Epidemiológica" },
        { title: "UNIPEX - Unidade de Pesquisa Experimental" },
        { title: "UNIPEX_2 - Unidade de Pesquisa Experimental (UNIPEX)" },
        { title: "CEO - Central de Embarcações Oceanográficas" },
        { title: "LFS - Laboratório de Fenômenos de Superfície" },
        { title: "IPENMULTI - CENTRAL IPEN MULTIUSUÁRIO" },
        { title: "LNM - Laboratório de Nutrição e Metabolismo " },
        {
          title: "CMFQA - Central Multiusuário de Físico-Química dos Alimentos",
        },
        { title: "BROMATOZAZ - Central Multiusuário de Bromatologia" },
        { title: "VMA - Vias Metabólicas na Agricultura" },
        {
          title:
            "LMSeq - Laboratório  Multiusuario de Sequenciamento de Ácidos Nucléicos",
        },
        { title: "LabMass - Laboratório de Espectrometria de Massas" },
        { title: "CDB - Centro para Documentação da Biodiversidade" },
        { title: "LEGaL - Laboratório de Espectrometria Gama e Luminescência" },
        { title: "MultiSed - Central Multiusuário de Geologia Sedimentar" },
        { title: "CMGeo - Central Multiusuário Geoanalitica" },
        { title: "LNA - Laboratório de Nanomateriais e Aplicações" },
        { title: "LFF - Central Multiusuário do Laboratório de Filmes Finos" },
        {
          title:
            "SIGLA - CEGH-CEL - Centro de Pesquisa sobre o Genoma Humano e Células-Tronco",
        },
        { title: "MAT - Materiais FOB" },
        {
          title:
            "FOUSPMulti - Central Multiusuários da Faculdade de Odontologia da Universidade de São Paulo",
        },
        { title: "CORE - Centro Oceanográfico de Registros Estratigráficos" },
        { title: "LaMeF - Laboratório de Metalurgia Física" },
        { title: "HEATGROUP - Grupo de Pesquisa em Transferência de Calor" },
        { title: "LMMC - Laboratório Multiusuário de Microscopia Confocal" },
        {
          title:
            "BIOTECNOLOGIA-ESALQ - Laboratório Multiusuários Centralizado de Genômica Funcional Aplicada à Agropecuária e Agroenergia",
        },
        { title: "CMAA - Central Multiusuário de Análises Ambientais" },
        {
          title:
            "MULTIÔMICAS - Laboratório Multiusuários de Proteômica, Metabolômica e Lipidômica",
        },
        { title: "LME - Laboratorio de Microscopia eletronica" },
        {
          title:
            "FCF-IPEN - Centro de Imagens Pré-Clínicas - Faculdade de Ciências Farmacêuticas",
        },
        {
          title:
            "MicroPET - Central Multiusuário de Imagens Pré-Clínicas FCF-IPEN",
        },
        { title: "MiSeqFCF - Sequenciador Illumina MiSeq - FCF" },
        { title: "CMFCF - Central Multiusuário da FCF" },
        {
          title:
            "CaMicro - Central Multiusuário de Caracterização em Microondas e Ondas Milimétricas",
        },
        {
          title:
            "GMSIE - Central Multiusuario Grupo de Mecânica do Sólidos e Impacto de Estruturas",
        },
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
