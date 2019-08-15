<template>
  <v-app>
    <v-form>
      <v-text-field label="Pesquisa" v-model="search" append-icon="search"></v-text-field>
    </v-form>
    <v-data-table :headers="headers" :items="sheet" :search="search" hide-actions hide-headers>
      <template v-slot:items="props">
        <v-container>
          <v-card flat tile class="white--text">
            <v-title></v-title>
          </v-card>
        </v-container>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    sheet: [],
    search: "",
    headers: []
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch();
      const data = await request.json();
      return data;
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>