<template>
  <v-app>
    <!--
    <Description
      propsTitle="Educação em Inovação e Empreendedorismo"
      propsDescription="Cursos e disciplinas para ensino de inovação e empreendedorismo na Universidade de São Paulo."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLScetP0_LFQSvijjfaB7YRMZ1el-UbYRCsbigNnW6StdeYbS7g/viewform"
    />-->

    <Table :propsSheet="sheet" :propsHeaders="headers" :propsProperties="properties" />
  </v-app>
</template>

<script>
import Table from "../components/Table.vue";
import Description from "../components/Description.vue";

export default {
  components: {
    Table,
    Description
  },
  data: () => ({
    sheet: [],
    headers: [
      { text: "Disciplina", value: "name" },
      { text: "Categoria", value: "category" },
      { text: "Área", value: "field" },
      { text: "Campus", value: "campus" },
      { text: "Unidade", value: "unity" },
      { text: "Nível", value: "level" }
    ],
    urls: [
      "https://spreadsheets.google.com/feeds/list/1Ix-DhWFeELDEy9PRAfaQo7rR6aHc0UWRxbhNFe9kv3Y/o7xkuxw/public/values?alt=json",
      "https://spreadsheets.google.com/feeds/list/1Ix-DhWFeELDEy9PRAfaQo7rR6aHc0UWRxbhNFe9kv3Y/oqw270x/public/values?alt=json"
    ],
    properties: {
      categories: {
        label: "Categorias",
        data: [],
        select: []
      },
      fields: {
        label: "Áreas",
        data: [],
        select: []
      },
      campus: {
        label: "Campus",
        data: [],
        select: []
      },
      unities: {
        label: "Unidades",
        data: [],
        select: []
      },
      levels: {
        label: "Níveis",
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
        let subject = {
          name: item.gsx$matéria.$t,
          campus: item.gsx$campus.$t,
          unity: item.gsx$unidade.$t,
          url: i ? item.gsx$_clrrx : item.gsx$site.$t,
          description: item.gsx$descriçãocurtaaté170caracteres.$t,
          field: item.gsx$departamentoprogramaouáreadeconcentração.$t,
          level: item.gsx$categoria.$t,
          category: item.gsx$categorias.$t
        };

        if (!this.properties.campus.data.includes(subject.campus))
          this.properties.campus.data.push(subject.campus);

        if (!this.properties.unities.data.includes(subject.unity))
          this.properties.unities.data.push(subject.unity);

        if (!this.properties.fields.data.includes(subject.field))
          this.properties.fields.data.push(subject.field);

        if (!this.properties.levels.data.includes(subject.level))
          this.properties.levels.data.push(subject.level);

        if (!this.properties.categories.data.includes(subject.category))
          this.properties.categories.data.push(subject.category);

        this.sheet.push(subject);
      });

      //       TODO: Sorting not working (I think it's the async await, it was working before)
      //      Object.values(this.properties).forEach(property => {
      //        property.sort();
      //      });
    }
  },
  created() {
    for (let i = 0; i < this.urls.length; i++) this.querySheet(this.urls[i], i);
  }
};
</script>
