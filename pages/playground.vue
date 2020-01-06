<template>
  <div>
    <Panel
      propsTitle="Desenvolvimento & Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />

    <v-data-iterator
      :items="tabs[0].content"
      item-key="name"
      loading
      loading-text="Indexando resultados..."
      hide-default-footer
    >
      <template v-slot:default="{ items, isExpanded, expand }">
        <v-container>
          <v-row>
            <v-col v-for="item in items" :key="item.name" cols="12" sm="6" md="4" lg="4">
              <v-card outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{item.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{item.unity}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-card-text v-if="!isExpanded(item)">{{item.short}}</v-card-text>
                <v-card-text v-else>{{item.long}}</v-card-text>
                <v-container>
                  <div align="center">
                    <v-btn icon @click="expand(item,!isExpanded(item))">
                      <v-icon>{{ isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </div>
                </v-container>
                <v-spacer />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
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
            short: row.gsx$descriçãocurta.$t,
            long: row.gsx$descriçãogeral.$t,
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