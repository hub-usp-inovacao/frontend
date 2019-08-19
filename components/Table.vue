<template>
  <v-app>
    <v-form>
      <v-text-field v-model="search" append-icon="search" label="Search"></v-text-field>
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
    search: ""
  }),
  methods: {
    set() {
      this.sheet = this.s;
      this.headers = this.h;
    }
  },
  created() {
    this.set();
  }
};
</script>
