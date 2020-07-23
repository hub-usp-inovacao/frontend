<template>
  <div>
    <v-app>
      <v-container fluid mt-12>
        <v-row class="ma-0 mt-12" align="center" justify="space-around" no-gutters>
          <v-col>
            <v-row class="ma-0" justify="center">
              <v-col cols="12" sm="9">
                <p class="display-2 font-weight-regular">Contato</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="11" sm="5"></v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="center">
          <template v-for="(icon,i) in icons">
            <v-col :key="icon.label">
              <v-container>
                <v-row align="center">
                  <v-btn :href="icon.url" class="mx-4" icon dark color="black">
                    <v-icon size="60px">{{ icon.label }}</v-icon>
                  </v-btn>

                  <p class="mb-0 title font-weight-regular">{{icon.description}}</p>
                </v-row>
              </v-container>
            </v-col>

            <v-responsive v-if="i == 2" :key="`width-${i}`" width="100%"></v-responsive>
          </template>
        </v-row>
      </v-container>

      <v-container>
        <v-row justify="center">
          <v-col cols="5">
            <p
              class="mb-0 title font-weight-light"
            >Caso você tenha interesse de ter a sua inovação, estrutura, competência, empresa ou patente dentro do portal, basta clicar no botão ao lado:</p>
          </v-col>

          <v-col cols="5">
            <v-card height="10rem" color="secondary">
              <v-container fill-height>
                <v-row justify="center" align="center">
                  <v-btn x-large rounded depressed color="rgba(175, 236, 255, 0.4)">
                    <span class="white--text font-weight-black">CLIQUE AQUI</span>
                  </v-btn>
                </v-row>
              </v-container>
            </v-card>
            <p
              class="caption font-italic font-weight-light"
            >A AUSPIN analisará sua solicitação e tomará as providências adequadas no menor tempo possível.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Panel from "@/components/first_level/Panel.vue";

export default {
  components: {
    Panel,
  },
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
  }),
};
</script>