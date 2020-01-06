<template>
  <div>
    <Panel
      propsTitle="Desenvolvimento & Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />
    <v-container class="hidden-sm-and-down" style="height: 100vh">
      <v-row>
        <v-col>
          <v-card outlined tile>
            <v-list>
              <div v-for="tab in this.tabs" :key="tab.name">
                <v-list-group v-model="tab.active">
                  <template v-slot:activator>
                    <v-list-item-title>{{tab.name}}</v-list-item-title>
                  </template>
                  <v-list-item-group class="overflow50" v-model="tab.select">
                    <v-list-item
                      v-for="item in tab.content"
                      :key="item.name"
                      @click="current = item; for(var i in tabs) tabs[i].select=-1;"
                    >{{item.name}}</v-list-item>
                  </v-list-item-group>
                </v-list-group>
                <v-divider v-if="tab != tabs[3]" />
              </div>
            </v-list>
          </v-card>
        </v-col>

        <v-col>
          <v-card outlined tile>
            <div style="max-height: 82vh; overflow: auto;">
              <v-container>
                <div align="center" class="title mt-5 mx-5">{{current.name}}</div>
              </v-container>
              <v-container>
                <div class="font-weight-light mx-5">{{current.description}}</div>
              </v-container>
              <div align="center" class="ma-5" v-if="current.url">
                <v-btn
                  depressed
                  dark
                  tile
                  color="rgba(239, 127, 45, 1)"
                  :href="current.url"
                >Visite o site</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="hidden-md-and-up">
      <div>
        <v-select
          background-color="white"
          class="mx-3 mt-5"
          color="rgba(239, 127, 45, 1)"
          label="Categoria"
          v-model="category"
          outlined
          :items="tabs.map(function(t) {return t.name})"
        ></v-select>
        <v-card
          class="ma-3"
          outlined
          tile
          v-for="item in this.tabs[getIndex()].content"
          :key="item.name"
        >
          <div align="center" class="title ma-5">{{item.name}}</div>
          <div class="font-weight-light ma-5">{{item.description}}</div>
          <div align="center" class="ma-5" v-if="item.url">
            <v-btn depressed dark color="rgba(239, 127, 45, 1)" :href="item.url">Visite o site</v-btn>
          </div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import Card from "../components/Card.vue";
import Panel from "../components/Panel2.vue";

export default {
  components: {
    Card,
    Panel
  },
  data: () => ({
    category: "INCT",
    current: {
      name: "Escolha um item na lista",
      description: "O texto será exibido aqui."
    },
    tabs: [
      {
        name: "INCT",
        select: -1,
        active: true,
        workSheetID: "od6",
        content: []
      },
      {
        name: "CEPID",
        select: -1,
        workSheetID: "ocum0f9",
        content: []
      },
      {
        name: "EMBRAPII",
        select: -1,
        workSheetID: "omymu3b",
        content: []
      },
      {
        name: "Centrais Multiusuário",
        select: -1,
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
    },
    getIndex() {
      for (var i in this.tabs)
        if (this.tabs[i].name === this.category) return i;

      return 0;
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
</style>