<template>
  <div>
    <Description
      propsTitle="Iniciativas em Inovação e Empreendedorismo"
      propsDescription="Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSd2gMMb3t01oDwYSbsgoUK1hCeEiC9zq7tt2AKzMoJ2Dcu1SA/viewform"
    />

    <div class="mx-5">
      <v-row>
        <v-col>
          <v-container style="position: fixed">
            <v-text-field
              style="width: 400px"
              v-model="search"
              append-icon="search"
              label="Procure ..."
              hide-details
              outlined
              clearable
            />
            <v-select
              class="my-4"
              style="width: 400px"
              :items="titles"
              label="Categoria"
              v-model="selectCategory"
              outlined
              chips
              multiple
              hide-details
            />
            <v-select
              class="my-4"
              style="width: 400px"
              :items="campus"
              label="Campus"
              v-model="selectCampus"
              outlined
              chips
              multiple
              hide-details
            />
            <v-select
              class="my-4"
              style="width: 400px"
              :items="unity"
              label="Unidade"
              v-model="selectUnity"
              outlined
              chips
              multiple
              hide-details
            />
            <v-btn @click="clearFilters()">Limpar filtros</v-btn>
          </v-container>
        </v-col>
        <v-col :cols="8">
          <div v-for="item in selectCategory" :key="item">
            <List
              :propsCategory="titles[findIndex(item)]"
              :propsColor="colors[findIndex(item)]"
              :propsData="sheetData[findIndex(item)]"
              :propsSearch="search"
              :propsCampus="selectCampus"
              :propsUnity="selectUnity"
              class="mt-10"
            />
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
import Description from "../components/Description.vue";

export default {
  components: {
    List,
    Description
  },
  data: () => ({
    sheetData: [[], [], [], [], [], []],
    search: "",
    url: [
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/od6/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/oqp33tv/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/ogdton5/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/oqjphm4/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/o1wzsj3/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/o23pvrb/public/values?alt=json"
    ],
    titles: [],
    colors: ["#e3584b", "#966acc", "#77d47b", "#f0e660", "#678fe6", "#f59e42"],
    selectCategory: [],
    selectCampus: [],
    selectUnity: [],
    campus: [],
    unity: []
  }),
  methods: {
    async sheetQuery(url, i) {
      const request = await fetch(url);
      const data = await request.json();

      data.feed.entry.forEach(row => {
        if (row.gsx$url.$t.substring(0, 4) != "http")
          row.gsx$url.$t = "http://" + row.gsx$url.$t;

        this.sheetData[i].push({
          name: row.gsx$título.$t,
          description: row.gsx$descriçãocurta.$t,
          url: row.gsx$url.$t,
          campus: row.gsx$localização.$t,
          unity: row.gsx$unidades.$t,
          category: row.gsx$tags.$t
        });

        if (!this.campus.includes(row.gsx$localização.$t))
          this.campus.push(row.gsx$localização.$t);

        if (!this.unity.includes(row.gsx$unidades.$t))
          this.unity.push(row.gsx$unidades.$t);
      });

      this.titles.push(data.feed.title.$t);

      this.titles.sort();
      this.campus.sort();
      this.unity.sort();
    },
    findIndex(item) {
      for (let i = 0; i < this.titles.length; i++)
        if (this.titles[i] == item) return i;
      return 0;
    },
    clearFilters() {
      this.search = "";
      this.selectCategory = [];
      this.selectCampus = [];
      this.selectUnity = [];
    }
  },
  beforeMount() {
    for (let i = 0; i < this.url.length; i++) this.sheetQuery(this.url[i], i);
  }
};
</script>
