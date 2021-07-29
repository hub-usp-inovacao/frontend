<template>
  <div>
    <Step
      title="Criar a Empresa"
      :description="description"
      color="#F4C41E"
      :buttons="buttons"
      next="aprimorar"
      previous="pratica"
      next-color="#338C21"
      previous-color="#E46926"
      :items="filteredIncubators"
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
      `Encontre uma rede de apoio para se conectar com outras startups e um local para
instalar sua equipe em uma das 4 Incubadoras e do Parque Tecnológico da USP.`,
      `Há no estado de São Paulo uma diversificada rede de ambientes de inovação
com aceleradoras, incubadoras e parques que também podem abrigar o seu
negócio`,
    ],
    buttons: [
      { label: "Incubadoras e Parques Técnologicos da USP" },
      { label: "Incubadoras e Parques Técnologicos Externos" },
    ],

    incubadoras: {
      "INCUBADORAS E PARQUES TÉCNOLOGICOS DA USP": [
        "CIETEC - Centro de Inovação, Empreendedorismo e Tecnologia",
        "ESALQTec - Incubadora de Empresas Agrozootécnicas de Piracicaba",
        "HABITs - Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
        "Supera - Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
        "Supera Parque de Inovação e Tecnologia",
      ],
      "INCUBADORAS E PARQUES TÉCNOLOGICOS EXTERNOS": [
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

    selectedButtonSecondary: undefined,
  }),

  computed: {
    filteredIncubators() {
      const secondaryButton = this.selectedButtonSecondary;

      if (secondaryButton != undefined) {
        return this.incubadoras[secondaryButton];
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
