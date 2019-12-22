<template>
  <div>
    <Panel
      propsTitle="Iniciativas"
      propsDescription="Organizações e programas para o estímulo e suporte da inovação e empreendedorismo na universidade."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSd2gMMb3t01oDwYSbsgoUK1hCeEiC9zq7tt2AKzMoJ2Dcu1SA/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Poli_Febrace_81-16_foto-Cec%C3%ADlia-Bastos-30.jpg"
    />

    <div class="mx-5" style="min-height: 100vh">
      <v-row no-gutters>
        <v-col>
          <div class="fix-left">
            <v-container>
              <v-container>
                <h1 align="center" class="font-weight-regular">INICIATIVAS</h1>
              </v-container>

              <v-container>
                <Input :propsModel="search" @input="search = $event" />
              </v-container>

              <div v-for="property in properties" :key="property.label">
                <v-container>
                  <Select
                    :propsItems="property.data"
                    :propsLabel="property.label"
                    :propsModel="property.select"
                    @input="property.select = $event"
                  />
                </v-container>
              </div>

              <v-container>
                <v-row>
                  <v-col>
                    <v-btn @click="clearFilters()" outlined tile>Limpar filtros</v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="rgba(29, 112, 191, 0.7)"
                      style="color: white"
                      @click="properties.category.select = properties.category.data"
                      tile
                    >Adicionar tudo</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
          </div>
        </v-col>

        <v-col :cols="8">
          <v-container v-for="category_str in properties.category.select" :key="category_str">
            <List
              :propsColor="colors[findIndex(category_str)]"
              :propsData="sheetData[findIndex(category_str)]"
              :propsSearch="search"
              :propsCategory="category_str"
              :propsCampus="properties.campus.select"
              :propsUnity="properties.unity.select"
            />
          </v-container>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import List from "../components/List.vue";
import Select from "../components/Select.vue";
import Input from "../components/Input.vue";
import Panel from "@/components/Panel2.vue";

export default {
  components: {
    List,
    Select,
    Input,
    Panel
  },
  data: () => ({
    sheetData: [[], [], [], [], [], []],
    search: "",
    urls: [
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/od6/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/oqp33tv/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/ogdton5/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/oqjphm4/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/o1wzsj3/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1A_sT9uUyR_tp4BAoGkJPoPx6egPuyRHM62nmNdxjYHg/o23pvrb/public/values?alt=json"
    ],
    colors: ["#e3584b", "#966acc", "#77d47b", "#f0e660", "#678fe6", "#f59e42"],
    properties: {
      category: {
        label: "Categorias",
        data: [],
        select: []
      },
      campus: {
        label: "Campus",
        data: [],
        select: []
      },
      unity: {
        label: "Unidades",
        data: [],
        select: []
      }
    }
  }),
  methods: {
    async querySheet(url, i) {
      const request = await fetch(url);
      const data = await request.json();

      data.feed.entry.forEach(item => {
        if (item.gsx$url.$t.substring(0, 4) != "http")
          item.gsx$url.$t = "http://" + item.gsx$url.$t;

        this.sheetData[i].push({
          name: item.gsx$título.$t,
          description: item.gsx$descriçãocurta.$t,
          url: item.gsx$url.$t,
          campus: item.gsx$localização.$t,
          unity: item.gsx$unidades.$t,
          category: item.gsx$tags.$t
        });

        if (
          item.gsx$localização.$t &&
          !this.properties.campus.data.includes(item.gsx$localização.$t)
        )
          this.properties.campus.data.push(item.gsx$localização.$t);

        if (
          item.gsx$unidades.$t &&
          !this.properties.unity.data.includes(item.gsx$unidades.$t)
        )
          this.properties.unity.data.push(item.gsx$unidades.$t);
      });

      this.properties.category.data.push(data.feed.title.$t);

      // TODO: Sorting not working (it was working before)
      // Object.values(this.properties).forEach(property => {
      //   property.data.sort();
      // });
    },
    findIndex(category_str) {
      for (let i = 0; i < this.properties.category.data.length; i++)
        if (this.properties.category.data[i] == category_str) return i;
      return 0;
    },
    clearFilters() {
      this.search = "";
      Object.values(this.properties).forEach(property => {
        property.select = [];
      });
    }
  },
  mounted() {
    for (let i = 0; i < this.urls.length; i++) this.querySheet(this.urls[i], i);
  }
};
</script>

<style scoped>
.fix-left {
  width: 435px;
  overflow-y: auto;
  bottom: 0;
  top: 65px;
}
</style>
