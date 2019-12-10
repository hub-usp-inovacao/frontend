<template>
  <div>
    <v-app class="blue-background">
      <v-row>
        <v-col align-self="center">
          <v-container px-10>
            <p class="display-2 white--text">Iniciativas</p>
            <p class="title white--text font-weight-light">
              Organizações e programas para o
              estímulo e suporte da inovação e
              empreendedorismo.
            </p>
            <v-btn depressed dark color="#da1955">Cadastre a sua</v-btn>
          </v-container>
        </v-col>
        <v-col class="image-background" align-self="stretch"></v-col>
      </v-row>
    </v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel v-for="items in this.tabs" :key="items.name">
              <v-expansion-panel-header class="title font-weight-regular">{{items.name}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item-group>
                  <v-list-item
                    v-for="item in items.content"
                    :key="item.name"
                    @click="showing = item"
                  >{{item.name}}</v-list-item>
                </v-list-item-group>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col>
          <v-card style="position: sticky">
            <v-container v-if="showing">
              <v-card-title align="center" class="title">{{showing.name}}</v-card-title>
              <v-container class="font-weight-light">{{showing.description}}</v-container>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    showing: null,
    tabs: {
      tab1: {
        name: "INCT",
        workSheetID: "od6",
        content: []
      },
      tab2: {
        name: "CEPID",
        workSheetID: "ocum0f9",
        content: []
      },
      tab3: {
        name: "EMBRAPII",
        workSheetID: "omymu3b",
        content: []
      },
      tab4: {
        name: "Centrais Multiusuário",
        workSheetID: "owgefr6",
        content: []
      }
    }
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/" +
          this.tabs.tab1.workSheetID +
          "/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let di = {
          name: row.gsx$nomedoinstituto.$t,
          description: row.gsx$descriçãogeral.$t,
          url: row.gsx$site.$t,
          campus: row.gsx$campus.$t,
          unity: row.gsx$unidade.$t
        };
        if (di.name != "Nome do Instituto") this.tabs.tab1.content.push(di);
      });
    }
  },
  beforeMount() {
    this.sheetQuery();
  },
  show() {
    console.log("OI");
  }
};
</script>

<style scoped>
.blue-background {
  background-color: #2b80d1;
}
.pink-background {
  background-color: #da1955;
}
.image-background {
  background-image: url("http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg");
  background-size: cover;
}
</style>>

