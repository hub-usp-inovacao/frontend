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
        { title: "Biossistec Jr" },
        { title: "Com-Arte Júnio" },
        { title: "Comunica Fono Jr" },
        { title: "CORE Jr" },
        { title: "ECA Jr" },
        { title: "EEL Jr" },
        { title: "EESC Jr" },
        { title: "EJA" },
        { title: "ESALQ Jr. Consultori" },
        { title: "Farma Jr" },
        { title: "Farmacon Jr" },
        { title: "FAUUSP Jr" },
        { title: "FEA Jr" },
        { title: "G.A Jr" },
        { title: "Gamma Jr. Engenhari" },
        { title: "Geo Jr" },
        { title: "Geronto Jr" },
        { title: "IAG Jr" },
        { title: "ICB Jr" },
        { title: "ICMC Jr" },
        { title: "IF Jr" },
        { title: "SINTE" },
        { title: "IME Jr" },
        { title: "InfoBio Jr" },
        { title: "Inova Química Jr" },
        { title: "IO Jr" },
        { title: "IQSC Jr" },
        { title: "Irhis Consultoria Jr. em Psicologi" },
        { title: "Jornalismo Jr" },
        { title: "Júnior FEAR" },
        { title: "Jurisconsultu" },
        { title: "LZT Jr" },
        { title: "Marketing Jr" },
        { title: "Medicina Jr" },
        { title: "Nutri Jr" },
        { title: "Nutrirp Consultoria Jr" },
        { title: "Poli Jr" },
        { title: "Qualimentos Jr" },
        { title: "RI USP Jr" },
        { title: "SanFran Jr" },
        { title: "Síntese Jr" },
        { title: "Têxtil e Moda Jr" },
        { title: "Vertun" },
      ],
      IDEAÇÃO: [
        { title: "AWC" },
        { title: "Escritório Piloto" },
        { title: "GEAR Poli" },
        { title: "Geek Vision" },
        { title: "Grupo SEMEAR" },
        { title: "Grupo Turing" },
        { title: "Hardware Livre USP" },
        { title: "HubEE" },
        { title: "IEEE Ramo Estudantil - Poli" },
        { title: "IMEmpreende" },
        { title: "IMESec" },
        { title: "Keep Flying" },
        { title: "Laboratório de Empreendedorismo - FEA" },
        { title: "LESC" },
        { title: "Liga de Mercado Financeiro - FEA" },
        { title: "Liga de Mercado Financeiro - São Carlos" },
        { title: "Liga USP de Gestão Pública" },
        { title: "Neuron" },
        { title: "PET Mecatrônica/Automação e Sistemas" },
        { title: "Poli Finance" },
        { title: "Poli Náutico" },
        { title: "Poli Racing" },
        { title: "PoliMilhagem" },
        { title: "Projeto Jupiter" },
        { title: "REDECOOP" },
        { title: "RGE - São Carlos" },
        { title: "Skyrats" },
        { title: "Tecs: Grupo de Computação Social" },
        { title: "ThundeRatz" },
        { title: "USP Mining Team" },
        { title: "USPGameDev" },
        { title: "USPSC SPIE Student Chapter" },
        { title: "Zenith Aerospace" },
      ],
      "GRUPOS E INICIATIVAS ESTUDANTIS": [
        { title: "Grupo de Negócios da Escola Politécnica" },
        { title: "Iniciativas Mercado" },
        { title: "INTENSIVO" },
        { title: "Poli Cidadã" },
        { title: "Poli Consulting Club" },
        { title: "SanFran Social" },
      ],
      "ENTIDADE ESTUDANTIL": [
        { title: "AIESEC - Ribeirão Preto" },
        { title: "AIESEC - São Carlos" },
        { title: "CodeLab" },
        { title: "ENACTUS - CAASO" },
        { title: "ENACTUS - EEL" },
        { title: "ENACTUS - ESALQ" },
        { title: "ENACTUS - FD" },
        { title: "ENACTUS - FEA" },
        { title: "ENACTUS - FEARP" },
        { title: "ENACTUS - FZEA" },
        { title: "IEEE Ramo Estudantil - São Carlos" },
        { title: "iTeam USP - São Carlos" },
        { title: "Nexos Gestão Pública" },
        { title: "Núcleo de Empreendedores - FEARP" },
        { title: "Núcleo de Empreendedorismo da USP - NEU" },
        { title: "Núcleo São Carlos" },
      ],
      "ESPAÇO/COWORKING": [
        { title: "Arena Santander" },
        { title: "COSMOS" },
        { title: "EESCin" },
        { title: "Espaço 8" },
        { title: "Fab Lab SP" },
        { title: "Hackerspace IFUSP" },
        { title: "INOVALAB@POLI" },
        { title: "Samsung Ocean" },
        { title: "SPARK Brazil" },
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
