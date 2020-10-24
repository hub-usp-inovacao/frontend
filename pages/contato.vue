<template>
  <div>
    <v-app>
      <v-container fluid mt-12>
        <v-row
          class="ma-0 mt-12"
          align="center"
          justify="space-around"
          no-gutters
        >
          <v-col>
            <v-row class="ma-0" justify="center">
              <v-col cols="12" sm="9">
                <p class="display-2 font-weight-regular">Contato</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" sm="5"></v-col>
        </v-row>

        <v-row class="center">
          <template v-for="(icon, i) in icons">
            <v-col :key="icon.label">
              <v-container>
                <v-row align="center">
                  <v-btn :href="icon.url" class="mx-4" icon dark color="black">
                    <v-icon size="60px">{{ icon.label }}</v-icon>
                  </v-btn>

                  <p class="mb-0 title font-weight-regular">
                    {{ icon.description }}
                  </p>
                </v-row>
              </v-container>
            </v-col>

            <v-responsive
              v-if="i == 2"
              :key="`width-${i}`"
              width="100%"
            ></v-responsive>
          </template>
        </v-row>

        <v-row
          class="ma-0 mt-12"
          align="center"
          justify="space-around"
          no-gutters
        >
          <v-col>
            <v-row class="ma-0" justify="center">
              <v-col cols="12" sm="9">
                <p class="display-2 font-weight-regular">Créditos</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" sm="5"></v-col>
        </v-row>
        <v-row class="ml-4">
          <v-col offset="1">UNIVERSIDADE DE SÃO PAULO</v-col>
        </v-row>
        <v-row class="ml-4">
          <v-col offset="1">Reitor: Prof. Dr. Vahan Agopyan</v-col>
        </v-row>
        <v-row class="ml-4">
          <v-col offset="1">
            Vice-reitor: Prof. Dr. Antonio Carlos Hernandes
          </v-col>
        </v-row>

        <v-row
          class="ma-0 mt-12"
          align="center"
          justify="space-around"
          no-gutters
        >
          <v-col>
            <v-row class="ma-0" justify="center">
              <v-col cols="12" sm="9">
                <p class="display-1 font-weight-regular">
                  AUSPIN - Agência USP de Inovação
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          class="ma-0 mt-12"
          align="baseline"
          align-content="space-around"
          justify="center"
          no-gutters
        >
          <v-col
            v-for="{ src, name, role } of auspin"
            :key="src"
            cols="6"
            md="3"
            lg="2"
            class="d-flex justify-center"
          >
            <v-card
              class="d-flex flex-column align-center justify-start"
              width="175"
              elevation="0"
            >
              <v-img
                style="border-radius: 100%"
                :src="src"
                width="85%"
                aspect-ratio="1"
              ></v-img>
              <v-card-title class="body-2 font-weight-medium">
                {{ name }}
              </v-card-title>
              <v-card-subtitle class="text-center caption">
                {{ role }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>

        <v-row
          class="ma-0 mt-12"
          align="center"
          justify="space-around"
          no-gutters
        >
          <v-col>
            <v-row class="ma-0" justify="center">
              <v-col cols="12" sm="9">
                <p class="display-1 font-weight-regular">
                  CodeLab - CCSL - IME
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row
          class="ma-0 mt-12"
          align="baseline"
          align-content="center"
          justify="center"
          no-gutters
        >
          <v-col
            v-for="{ src, name, role } of codelab"
            :key="src"
            cols="6"
            md="3"
            lg="2"
            class="d-flex justify-center"
          >
            <v-card
              class="d-flex flex-column align-center justify-start"
              width="175"
              elevation="0"
            >
              <v-img
                style="border-radius: 100%"
                :src="src"
                width="85%"
                aspect-ratio="1"
              ></v-img>
              <v-card-title class="body-2 font-weight-medium">
                {{ name }}
              </v-card-title>
              <v-card-subtitle class="text-center caption">
                {{ role }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        label: "mdi-facebook",
        description: "/inovacaousp",
        url: "https://www.facebook.com/inovacaonausp/",
        color: "rgba(59,89,153 ,1 )",
      },
      {
        label: "mdi-instagram",
        description: "@inovacaousp",
        url: "http://www.instagram.com/inovacaonausp/",
        color: "#C13584",
      },
      {
        label: "mdi-phone",
        description: "(11) 3091-4166",
        url: "http://www.instagram.com/inovacaonausp/",
        color: "#C13584",
      },
      {
        label: "mdi-twitter",
        description: "/inovacaousp",
        url: "https://twitter.com/inovacaonausp",
        color: "#00aced",
      },
      {
        label: "mdi-linkedin",
        description: "/inovacaousp",
        url: "https://www.linkedin.com/in/inovacaonausp/",
        color: "#0e76a8",
      },

      {
        label: "mdi-email",
        description: "empreende.auspin@usp.br",
        url: "http://www.instagram.com/inovacaonausp/",
        color: "#C13584",
      },
    ],
    auspin: [
      {
        src:
          "https://drive.google.com/uc?export=view&id=16I5lwNE1rgBGb6clZHxljJ_Y30H8uCOh",
        name: "Marcos Martins",
        role: "Coordenador",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1mJm4BeTMRLkh2fZxRNpqxInw0Oj5jXF8",
        name: "Geciane Porto",
        role: "Vice-Coordenadora",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1eHnS8N448dK0L1Evp9ME3fzgOe7vQDNg",
        name: "Josmar Andrade",
        role: "Assessor da Coordenação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1HpmDm9kCIO73lWN4HFuRxhFwBUsDgboc",
        name: "Ronaldo Nina",
        role: "Chefe da Comunicação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1omkFtI5worTLbUivgPm7G5r90vir_OS0",
        name: "Marcelo Valverde",
        role: "Arte Finalista",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1pqpMB5RVTuW9Z8jBFLFQUuCy7mtfRvc4",
        name: "Flávia Prado",
        role: "Agente de Inovação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1Eqmcp0gb-48XExknI_Ua-APXLlkABPFq",
        name: "Rodrigo Olivetti",
        role: "Empreendedorismo",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=186cZid7WcI4S4JFQoyL1vcetqe5siGPS",
        name: "Rosemeire Domingos",
        role: "Eventos",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=16zKodkgpLgVUDSmj8U9Rj5XLC85dSuGy",
        name: "Mariana Arruda",
        role: "Estag. - Comunicação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=19n8RxSEtc5-HABvYMOLc7IXTksA0N9yp",
        name: "Giovanna Kim",
        role: "Estag. - Comunicação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1GAPXXL6AnH_JubxcYUcV1fmUhbUkMlJn",
        name: "Heidi Piva",
        role: "Audiovisual",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1K1AOJ4A-ZDyk3rlfHXUAo83kfQrma8CN",
        name: "Davi Bastos",
        role: "Estag. - Comunicação",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1vbNc3zcZYYqYdTrp4hWCQAu60nUsxJzy",
        name: "Fernanda Basso",
        role: "Bolsista",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1iV8Q_ZpLdkcracVhjcZg0tf8EqTfSb7N",
        name: "Liliane Sartorio",
        role: "Bolsista",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1n4NCqLDF61CA9BVRe30ZYpeLgxlW69Bm",
        name: "Felipe Vogler",
        role: "Bolsista",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1vCA0Q9vJUk9k1K4toUW0ftI1QZK6VC2G",
        name: "Giovanni Watanabe",
        role: "Estag. - Comunicação",
      },
    ],

    codelab: [
      {
        src:
          "https://drive.google.com/uc?export=view&id=17FI5R3H9lZascX-p67TabXXpayvZHeqk",
        name: "Alfredo Goldman",
        role: "Coordenador",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1EsuupsEr2tpR8ExOVSg6_HXtzUG-i_hC",
        name: "João Daniel",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1jgOw_e3tjq8dY7pA8moJ0GDV4uKbO9kk",
        name: "Erick Santana",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1pR6n-PoKt0-h4b0O6oQIEUhETnY7IWRx",
        name: "Thiago Guerrero",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1G-JivuZjuGOh0hWj0iSRYN28d5DLjkss",
        name: "Leonardo Costa",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1BicPXgkm5JRtcxyKS-hPk78P9J4boyFT",
        name: "Gabriel Brandão",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1OEbinkI-1gDBsdrOGBqiVQfk-3Azk6tw",
        name: "Evandro Nakayama",
        role: "Desenvolvedor",
      },
      {
        src:
          "https://drive.google.com/uc?export=view&id=1FcC5OZjmlMU7ou7sqYoNwAWbreN_OXBm",
        name: "Renato Cordeiro",
        role: "Desenvolvedor",
      },
    ],
  }),
};
</script>
