<template>
  <div>
    <Description
      propsTitle="Iniciativas em Inovação e Empreendedorismo"
      propsDescription="Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na Universidade."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSd2gMMb3t01oDwYSbsgoUK1hCeEiC9zq7tt2AKzMoJ2Dcu1SA/viewform"
    />

    <div>
      <v-container v-for="i in url.length" :key="i">
        <List
          :propsCategory="titles[i - 1]"
          :propsColor="colors[i - 1]"
          :propsData="sheetData[i - 1]"
          :propsSearch="search"
          class="mx-10 mt-10"
        />
      </v-container>
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
    colors: ["#e3584b", "#966acc", "#77d47b", "#f0e660", "#678fe6", "#f59e42"]
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
      });

      this.titles[i] = data.feed.title.$t;
    }
  },
  beforeMount() {
    for (let i = 0; i < this.url.length; i++) this.sheetQuery(this.url[i], i);
  }
};
</script>
