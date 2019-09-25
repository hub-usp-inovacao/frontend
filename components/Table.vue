<template>
  <v-app>
    <v-form>
      <v-text-field
        class="all"
        v-model="search"
        append-icon="search"
        label="Search"
        hide-details
        outlined
      ></v-text-field>
      <v-divider /
      {{$vuetify.breakpoint.name}}
      <v-select class="all" :items="items" label="Unidade" v-model="select" outlined></v-select>
    </v-form>
    <v-data-table class="all" :headers="headers" :items="sheet" :search="search"></v-data-table>
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
