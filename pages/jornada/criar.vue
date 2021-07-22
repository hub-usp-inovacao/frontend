<template>
  <div>
    <Step
      title="Criar a Empresa"
      :description="description"
      color="#F4C41E"
      :buttons="buttons"
      next="criar"
      previous="pratica"
      next-color="#338C21"
      previous-color="#E46926"
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
      `Encontre uma rede de apoio para se conectar com outras startups e um local para
instalar sua equipe em uma das 4 Incubadoras e do Parque Tecnológico da USP.`,
      `Há no estado de São Paulo uma diversificada rede de ambientes de inovação
com aceleradoras, incubadoras e parques que também podem abrigar o seu
negócio`,
    ],
    route: "criar",
    buttons: [
      { label: "Incubadoras da USP" },
      { label: "Incubadoras Externas da USP" },
    ],

    incubadoras: {
      "INCUBADORAS DA USP": [
        {
          title: "CIETEC - Centro de Inovação, Empreendedorismo e Tecnologia",
        },
        {
          title:
            "ESALQTec - Incubadora de Empresas Agrozootécnicas de Piracicaba",
        },
        {
          title:
            "HABITs - Habitat de Inovação Tecnológica e Social/Incubadora-Escola",
        },
        {
          title:
            "Supera - Incubadora de Empresas de Base Tecnológica de Ribeirão Preto",
        },
        { title: "Supera Parque de Inovação e Tecnologia" },
      ],
      "INCUBADORAS EXTERNAS DA USP": [
        { title: "Acematão - Incubadora de Matão" },
        { title: "Agende - incubadora Tecnológica de Empresas Guarulhos" },
        { title: "CEDIN - Centro de desenvolvimento de Indústrias" },
        { title: "CIE - Centro Incubador de Empresas" },
        {
          title: "CIEM - Centro Incubador de Empresas de Marília Miguel Silva",
        },
        { title: "CINET - Centro Incubador de Empresas (Parq Tec)" },
        { title: "Design-Inn - Incubadora de Desing (Parq Tec)" },
        { title: "IEB - Incubadora Empresarial de Bebedouro" },
        { title: "IEL - Incubadora de Empresas de Leme (Parq Tec)" },
        {
          title:
            "INCAMP - Incubadora de Empresas de Base Tecnológica da UNICAMP",
        },
        { title: "Incubadora de Ciência, Tecnologia e Inovação de Limeira" },
        { title: "Incubadora de Empresas de Americana" },
        { title: "Incubadora de Empresas de Araras" },
        { title: "Incubadora de Empresas de Jundiaí" },
        { title: "Incubadora de Empresas de Lins" },
        { title: "Incubadora de Empresas de Olímpia" },
        { title: "Incubadora de Empresas do Mackenzie" },
        { title: "Incubadora de Empresas José João Sans" },
        { title: "Incubadora de Negócios da ESPM" },
        { title: "Incubadora Hubiz" },
        { title: "Incubadora Inova do IFSP" },
        { title: "Incubadora ITUFABC" },
        { title: "Incubadora Municipal de Empresas de Barueri" },
        { title: "Incubadora Profor" },
        { title: "Incubadora Tecnológica Univap" },
        { title: "Incubadora Zumbitek da Universidade Zumbi dos Palmares " },
        { title: "INOVAJAB - Unesp Campus de Jaboticabal" },
        { title: "INTEPP - Incubadora Tecnológica de Presidente Prudente" },
        { title: "Parque Científico e Tecnológico da UNICAMP" },
        { title: "Parque Eco Tecnológico Damha" },
        { title: "Parque Tecnológico Botucatu" },
        { title: "Parque Tecnológico CTI-TEC" },
        { title: "Parque Tecnológico da CIATEC" },
        { title: "Parque Tecnológico de Limeira" },
        { title: "Parque Tecnológico de São José Do Rio Preto" },
        { title: "Parque Tecnológico de São José Dos Campos (PqTec)" },
        { title: "Parque Tecnológico Univap" },
        { title: "Plataforma Kaeydos" },
        { title: "Polis de Tecnologia CPQD" },
        {
          title: "PROCULTURA - Incubadora Cultural de São João de Boa Vista",
        },
        { title: "Prospecta - Incubadora Tecnológica de Botucatu" },
        { title: "PTS - Parque Tecnológico de Santos" },
        { title: "PTS - Parque Tecnológico de Sorocaba" },
        {
          title:
            "São Carlos Science Park - Parque Tecnológico de São Carlos (Par}q Tec)",
        },
        {
          title:
            "Softnet - Centro Incubador de Empresas de Software  (Parq Tec)",
        },
      ],
    },

    selectedButtonSecondary: undefined,
  }),

  computed: {
    filteredDisciplines() {
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
