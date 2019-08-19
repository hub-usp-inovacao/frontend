<template>
  <v-app>
    <v-form>
      <v-text-field label="Pesquisar" v-model="search" append-icon="search"></v-text-field>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="sheet"
      :search="search"
      hide-default-headers
      hide-default-footer
    >
      <template v-slot:items="props">
        <v-container>
          <v-card flat tile class="white--text">
            <v-card-title>
              <div v-for="item in props.item" :key="item">
                <h3>{{item}}</h3>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn>Saiba Mais</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </template>
    </v-data-table>
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
