<template>
  <v-app>
    <v-container>
      <h1>Educação em Inovação e Empreendedorismo na USP</h1>
      <p
        class="my-1"
      >Cursos e disciplinas para ensino de inovação e empreendedorismo na Universidade de São Paulo.</p>
      <v-btn
        class="mt-3"
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLScetP0_LFQSvijjfaB7YRMZ1el-UbYRCsbigNnW6StdeYbS7g/viewform"
      >Cadastre a sua</v-btn>
    </v-container>

    <Table
      :propsSheet="sheet"
      :propsHeaders="headers"
      :propsCampus="campus"
      :propsUnity="unity"
      :propsField="field"
      :propsLevel="level"
    />
  </v-app>
</template>

<script>
import Table from "../components/Table.vue";

export default {
  components: {
    Table
  },
  data: () => ({
    sheet: [],
    headers: [
      { text: "Disciplinas", value: "name" },
      { text: "Área", value: "field" },
      { text: "Unidade", value: "unity" },
      { text: "Campus", value: "campus" },
      { text: "Nível", value: "level" },
      { text: "Descrição", value: "description", sortable: false }
    ],
    campus: [""],
    unity: [""],
    field: [],
    level: []
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/102q6lFiHtBFA24ldqTjmAgUlGFeSFATARn260i7WVvs/oqw270x/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        let subject = {
          name: row.gsx$matéria.$t,
          campus: row.gsx$campus.$t,
          unity: row.gsx$unidade.$t,
          url: row.gsx$url.$t,
          description: row.gsx$descriçãocurtaaté170caracteres.$t,
          field: row.gsx$departamentoprogramaouáreadeconcentração.$t,
          level: row.gsx$nívelgpg.$t
        };

        if (!this.campus.includes(subject.campus))
          this.campus.push(subject.campus);

        if (!this.unity.includes(subject.unity)) this.unity.push(subject.unity);

        if (!this.field.includes(subject.field)) this.field.push(subject.field);

        if (!this.level.includes(subject.level)) this.level.push(subject.level);

        this.sheet.push(subject);
      });

      this.campus.sort();
      this.unity.sort();
      this.field.sort();
      this.level.sort();
    }
  },
  created() {
    this.sheetQuery();
  }
};
</script>
