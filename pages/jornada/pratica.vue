<template>
  <div>
    <Step
      title="A Ideia na Prática"
      :description="description"
      color="#E46926"
      :buttons="buttons"
      next="criar"
      previous="aprenda"
      next-color="#F4C41E"
      previous-color="#C0161B"
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
      `Quer encontrar uma galera que esteja a fim de apoiar e trabalhar nas mesmas
  causas que você? Busque a entidade estudantil com a qual você mais se
  identifica e junte-se a essa turma:`,
      `Quer trabalhar com projetos ligados a inovação e empreendedorismo e ao mesmo
  tempo dar início à sua carreira? As Empresas Júnior são associações de alunos
  que prestam diferentes tipos de serviços, participe.`,
      `Na hora de colocar a sua ideia em prática, você pode participar de programas que
  inspiram e promovem o desenvolvimento de iniciativas inovadoras e
  empreendedoras disponíveis para a Comunidade USP:`,
      `Precisando de um lugar para colocar a sua ideia em prática? Procure os espaços
  da Universidade onde você poderá interagir com projetos e organizações ligadas
  à inovação e ao empreendedorismo`,
    ],
    route: "pratica",
    buttons: [
      { label: "Empresa Jr." },
      { label: "Ideação" },
      { label: "Grupos e Iniciativas Estudantis" },
      { label: "Entidade Estudantil" },
      { label: "Espaço/coworking" },
    ],

    items: {
      "EMPRESA JR.": [
        "Biossistec Jr",
        "Com-Arte Júnio",
        "Comunica Fono Jr",
        "CORE Jr",
        "ECA Jr",
        "EEL Jr",
        "EESC Jr",
        "EJA",
        "ESALQ Jr. Consultori",
        "Farma Jr",
        "Farmacon Jr",
        "FAUUSP Jr",
        "FEA Jr",
        "G.A Jr",
        "Gamma Jr. Engenhari",
        "Geo Jr",
        "Geronto Jr",
        "IAG Jr",
        "ICB Jr",
        "ICMC Jr",
        "IF Jr",
        "SINTE",
        "IME Jr",
        "InfoBio Jr",
        "Inova Química Jr",
        "IO Jr",
        "IQSC Jr",
        "Irhis Consultoria Jr. em Psicologi",
        "Jornalismo Jr",
        "Júnior FEAR",
        "Jurisconsultu",
        "LZT Jr",
        "Marketing Jr",
        "Medicina Jr",
        "Nutri Jr",
        "Nutrirp Consultoria Jr",
        "Poli Jr",
        "Qualimentos Jr",
        "RI USP Jr",
        "SanFran Jr",
        "Síntese Jr",
        "Têxtil e Moda Jr",
        "Vertun",
      ],
      IDEAÇÃO: [
        "AWC",
        "Escritório Piloto",
        "GEAR Poli",
        "Geek Vision",
        "Grupo SEMEAR",
        "Grupo Turing",
        "Hardware Livre USP",
        "HubEE",
        "IEEE Ramo Estudantil - Poli",
        "IMEmpreende",
        "IMESec",
        "Keep Flying",
        "Laboratório de Empreendedorismo - FEA",
        "LESC",
        "Liga de Mercado Financeiro - FEA",
        "Liga de Mercado Financeiro - São Carlos",
        "Liga USP de Gestão Pública",
        "Neuron",
        "PET Mecatrônica/Automação e Sistemas",
        "Poli Finance",
        "Poli Náutico",
        "Poli Racing",
        "PoliMilhagem",
        "Projeto Jupiter",
        "REDECOOP",
        "RGE - São Carlos",
        "Skyrats",
        "Tecs: Grupo de Computação Social",
        "ThundeRatz",
        "USP Mining Team",
        "USPGameDev",
        "USPSC SPIE Student Chapter",
        "Zenith Aerospace",
      ],
      "GRUPOS E INICIATIVAS ESTUDANTIS": [
        "Grupo de Negócios da Escola Politécnica",
        "Iniciativas Mercado",
        "INTENSIVO",
        "Poli Cidadã",
        "Poli Consulting Club",
        "SanFran Social",
      ],
      "ENTIDADE ESTUDANTIL": [
        "AIESEC - Ribeirão Preto",
        "AIESEC - São Carlos",
        "CodeLab",
        "ENACTUS - CAASO",
        "ENACTUS - EEL",
        "ENACTUS - ESALQ",
        "ENACTUS - FD",
        "ENACTUS - FEA",
        "ENACTUS - FEARP",
        "ENACTUS - FZEA",
        "IEEE Ramo Estudantil - São Carlos",
        "iTeam USP - São Carlos",
        "Nexos Gestão Pública",
        "Núcleo de Empreendedores - FEARP",
        "Núcleo de Empreendedorismo da USP - NEU",
        "Núcleo São Carlos",
      ],
      "ESPAÇO/COWORKING": [
        "Arena Santander",
        "COSMOS",
        "EESCin",
        "Espaço 8",
        "Fab Lab SP",
        "Hackerspace IFUSP",
        "INOVALAB@POLI",
        "Samsung Ocean",
        "SPARK Brazil",
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

<style></style>
