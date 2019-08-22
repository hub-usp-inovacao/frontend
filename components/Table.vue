<template>
  <v-app>
    <v-form>
      <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
      <v-select :items="items" label="Unidade" v-model="select"></v-select>
    </v-form>
    <v-data-table :headers="headers" :items="sheet" :search="search"></v-data-table>
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
    items: ["IME", "FAU", "FEA", "EP"]
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
