<template>
  <v-app>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <h1 class="all">Educação em Inovação e Empreendedorismo na USP</h1>
            <p
              class="all"
            >Cursos e disciplinas para ensino de inovação e empreendedorismo na Universidade de São Paulo.</p>
            <v-btn
              href="https://docs.google.com/forms/d/e/1FAIpQLScetP0_LFQSvijjfaB7YRMZ1el-UbYRCsbigNnW6StdeYbS7g/viewform"
            >Cadastre a sua</v-btn>
          </v-col>
          <v-col>
            <v-img :src="office" aspect-ratio="16/9" max-width="600px" max-height="300px"></v-img>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-text-field
          class="all"
          v-model="search"
          append-icon="search"
          label="Procure uma palavra-chave entre as disciplinas cadastradas"
          hide-details
          outlined
        ></v-text-field>
      </v-container>
      <v-container>
        <v-row>
          <v-col>
            <v-select class="all" :items="items" label="Unidade" v-model="select" outlined></v-select>
          </v-col>
          <v-col>
            <v-select class="all" :items="items" label="Campus" v-model="select" outlined></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider />
    <v-data-table class="all my-12" :headers="headers" :items="sheet" :search="search"></v-data-table>
  </v-app>
</template>

<script>
export default {
  props: ["s", "h"],
  data: () => ({
    sheet: [],
    headers: [],
    search: "",
    select: "",
    distinct: [],
    items: [
      "",
      "IME",
      "FAU",
      "FEA",
      "EP",
      "EESC",
      "FFCLRP",
      "IFSC",
      "EACH",
      "ECA",
      "IP"
    ]
  }),
  methods: {
    set() {
      this.sheet = this.s;
      this.headers = this.h;
      this.headers.push({
        filter: (value, search, item) => {
          return !this.select ? true : item.unity == this.select;
        }
      });
    }
  },
  created() {
    this.set();
  }
};
</script>
