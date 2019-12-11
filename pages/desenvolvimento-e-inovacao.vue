<template>
  <div>
    <Panel
      propsTitle="Desenvolvimento e Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />
    <v-container>
      <v-row>
        <v-col>
          <v-expansion-panels v-model="panel" accordion>
            <v-expansion-panel v-for="items in this.tabs" :key="items.name">
              <v-expansion-panel-header class="title font-weight-regular">{{items.name}}</v-expansion-panel-header>
              <v-expansion-panel-content class="overflow50">
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
          <v-card>
            <v-container v-if="showing">
              <v-card-title align="center" class="title">{{showing.name}}</v-card-title>
              <v-container class="font-weight-light" style="oveflow:auto">{{showing.description}}</v-container>
              <div align="center" v-if="showing.url">
                <v-btn depressed dark color="#da1955" :href="showing.url">Visite o site</v-btn>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Panel from "../components/Panel.vue";

export default {
  components: {
    Card,
    Panel
  },
  data: () => ({
    panel: 0,
    showing: {
      name: "Escolha um item na lista",
      description: "O texto será exibido aqui."
    },
    tabs: [
      {
        name: "INCT",
        workSheetID: "od6",
        content: []
      },
      {
        name: "CEPID",
        workSheetID: "ocum0f9",
        content: []
      },
      {
        name: "EMBRAPII",
        workSheetID: "omymu3b",
        content: []
      },
      {
        name: "Centrais Multiusuário",
        workSheetID: "owgefr6",
        content: []
      }
    ]
  }),
  methods: {
    async sheetQuery() {
      for (var i in this.tabs) {
        const request = await fetch(
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/" +
            this.tabs[i].workSheetID +
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
          if (di.name != "Nome do Instituto") this.tabs[i].content.push(di);
        });
      }
    }
  },
  beforeMount() {
    this.sheetQuery();
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
.overflow50 {
  max-height: 50vh;
  overflow-y: auto;
}
</style>>