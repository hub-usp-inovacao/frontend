<template>
  <v-app>
    <v-form>
      <v-text-field
        class="all"
        v-model="search"
        hide-details
        append-icon="search"
        label="Search"
        outlined
      ></v-text-field>
      <v-divider />
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
    items: ["", "IME", "FAU", "FEA", "EP", "EESC", "FFCLRP", "IFSC", "EACH", "ECA", "IP"]
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
      this.distinct = [...new Set(this.headers.unity)];
    }
  },
  created() {
    this.set();
  }
};
</script>

<style scoped>
.v-text-field {
  font-family: "Oswald", sans-serif;
  text-transform: uppercase;
}
</style>