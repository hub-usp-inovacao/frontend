<template>
  <div>
    <Panel
      propsTitle="Desenvolvimento & Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />

    <div class="py-7" style="background-color: rgba(239, 127, 45, 1)">
      <v-container>
        <v-text-field
          append-icon="search"
          label="Pesquisar"
          color="white"
          v-model="typed"
        ></v-text-field>
      </v-container>
    </div>
    <v-container>
      <v-data-iterator
        :items="entries"
        item-key="name"
        :search="search"
        group-by="id"
        sort-by="name"
        no-results-text="Não encontramos nada..."
        loading
        loading-text="Indexando resultados..."
      >
        <template v-slot:default="{ items, isExpanded, expand }">
          <masonry :cols="setCols()">
            <v-container v-for="item in items" :key="item.name">
              <v-card>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline mb-1">{{
                      item.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.unity
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <p
                  class="mx-5"
                  v-html="isExpanded(item) ? item.long : item.short"
                ></p>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    depressed
                    dark
                    color="rgb(239, 127, 45)"
                    :href="item.url"
                    >Visite o site</v-btn
                  >
                  <v-spacer />
                  <v-btn icon @click="expand(item, !isExpanded(item))">
                    <v-icon>{{
                      isExpanded(item) ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-spacer />
              </v-card>
            </v-container>
          </masonry>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { debounce } from "debounce";
import Card from "../components/Card.vue";
import Input from "../components/Input.vue";
import Panel from "../components/Panel2.vue";

export default {
  components: {
    Card,
    Input,
    Panel
  },
  data: () => ({
    search: "",
    typed: "",
    entries: [],
    tabs: [
      {
        name: "INCT",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/od6/public/values?alt=json",
        content: []
      },
      {
        name: "CEPID",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/ocum0f9/public/values?alt=json",
        content: []
      },
      {
        name: "EMBRAPII",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/omymu3b/public/values?alt=json",
        content: []
      }
      // {
      //   name: "Centrais Multiusuário",
      //   url:
      //     "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/owgefr6/public/values?alt=json",
      //   content: []
      // }
    ]
  }),
  methods: {
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 3;
        case "xl":
          return 4;
      }
    },
    async sheetQuery() {
      for (var i in this.tabs) {
        const request = await fetch(this.tabs[i].url);
        const data = await request.json();
        data.feed.entry.forEach(row => {
          let di = {
            name: row.gsx$nomedoinstituto.$t,
            short: row.gsx$descriçãocurta.$t,
            long: row.gsx$descriçãogeral.$t,
            url: row.gsx$site.$t,
            campus: row.gsx$campus.$t,
            unity: row.gsx$unidade.$t,
            id: this.tabs[i].name
          };
          if (di.name != "Nome do Instituto") {
            this.tabs[i].content.push(di);
            this.entries.push(di);
          }
        });
      }
    }
  },
  watch: {
    typed: debounce(function() {
      this.search = this.typed;
    }, 400)
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
