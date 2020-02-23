<template>
  <div>
    <p class="display-2">Página em construção</p>
    <!-- <Panel
      propsTitle="Desenvolvimento & Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Instala%C3%A7%C3%B5es-Instituto-Pasteur-USP_Foto-Marcos-Santos_U0Y8339.jpg"
    />

    <div class="py-7" style="background-color: rgba(239, 127, 45, 1)">
      <v-container>
        <v-text-field append-icon="search" label="Pesquisar" color="white" v-model="typed"></v-text-field>
      </v-container>
    </div>

    <v-container>
      <div v-for="tab in tabs" :key="tab.name">
        <v-divider v-if="tab != tabs[0]" />
        <v-container>
          <p class="title font-weight-black">{{tab.name}}</p>
          <p class="font-weight-light">{{tab.description}}</p>
        </v-container>
        <v-data-iterator
          :items="tab.content"
          item-key="name"
          :search="search"
          group-by="id"
          sort-by="name"
          no-results-text="Não encontramos nada..."
          loading
          loading-text="Indexando resultados..."
          :items-per-page="Number(-1)"
          hide-default-footer
        >
          <template v-slot:default="{ items, isExpanded, expand }">
            <masonry :cols="size">
              <v-container v-for="item in items" :key="item.name">
                <v-card>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">{{item.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.unity}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-text>{{item.short}}</v-card-text>

                  <v-expand-transition>
                    <div v-show="isExpanded(item)">
                      <v-card-text>{{item.long}}</v-card-text>
                    </div>
                  </v-expand-transition>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn depressed dark color="rgb(239, 127, 45)" :href="item.url">Visite o site</v-btn>
                    <v-spacer />
                    <v-btn icon @click="expand(item,!isExpanded(item))">
                      <v-icon>{{ isExpanded(item) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-spacer />
                </v-card>
              </v-container>
            </masonry>
          </template>
        </v-data-iterator>
      </div>
    </v-container>-->
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
        name: "CEPID",
        description:
          "São os Centros de Pesquisa, Inovação e Difusão (Cepids), apoiados pela FAPESP que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante.",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/ocum0f9/public/values?alt=json",
        content: []
      },
      {
        name: "EMBRAPII",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial é uma organização que apoia instituições de pesquisa tecnológica, em selecionadas áreas de competência, para que executem projetos de desenvolvimento de pesquisa tecnológica para inovação, em cooperação com empresas do setor industrial.",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/omymu3b/public/values?alt=json",
        content: []
      },
      {
        name: "INCT",
        description:
          "Os Institutos Nacionais de Ciência e Tecnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
        url:
          "https://spreadsheets.google.com/feeds/list/1zYd3cb3rsSz8U64Liay9Ti2_GMpdfDAeSturoFo5sAQ/od6/public/values?alt=json",
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
  computed: {
    size: function() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 3;
        case "xl":
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 4;
      }
    }
  },
  beforeMount() {
    this.sheetQuery();
  },
  debounce(func, wait) {
    let timer = null;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(func, wait);
    };
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