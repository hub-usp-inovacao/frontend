<template>
  <div>
    <Panel
      propsTitle="Desenvolvimento & Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />
    <v-container style="height: 85vh">
      <v-row>
        <v-col>
          <!-- <v-expansion-panels v-model="panel" accordion outlined>
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
          </v-expansion-panels>-->
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
                      @click="current = item; for(i in tabs) tabs[i].select=-1;"
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
              <div align="center" class="title ma-5">{{current.name}}</div>
              <div class="font-weight-light ma-5">{{current.description}}</div>
              <div align="center" class="ma-5" v-if="current.url">
                <v-btn
                  depressed
                  dark
                  color="rgba(239, 127, 45, 1)"
                  :href="current.url"
                >Visite o site</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
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