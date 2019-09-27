<template>
  <v-app>
    <v-data-iterator :items="sheet" :search="search" :items-per-page="32">
      <template v-slot:header>
        <v-text-field
          class="all"
          v-model="search"
          append-icon="search"
          label="Search"
          hide-details
          outlined
          clearable
        ></v-text-field>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item" :v-if="!op || item.sector == op" cols="4">
            <v-card :color="color" class="all">
              <v-card-title class="primary--text">{{item.name}}</v-card-title>

              <v-card-text v-if="item.sector">
                <span class="grey--text subtitle-1">{{item.sector}}</span>
                <div>{{item.description}}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-app>
</template>

<script>
export default {
  props: ["color", "op"],
  data: () => ({
    sheet: [],
    search: "",
    headers: [
      { value: "name" },
      { value: "sector" },
      { value: "tech" },
      { value: "description" },
      { value: "products" },
      { value: "address" },
      { value: "email" }
    ]
  }),
  methods: {
    async sheetQuery() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/19y6seVpLZwrmygOpTrPpC-oUsZoXtLJHTXGQcNOFr80/opfe7m9/public/values?alt=json"
      );
      const data = await request.json();
      data.feed.entry.forEach(row => {
        if (row.gsx$isvalid.$t == "OK") {
          let v = {
            name: row.gsx$nome.$t,
            sector: row.gsx$setor.$t,
            tech: row.gsx$tecnologia.$t,
            description: row.gsx$descrição.$t,
            products: row.gsx$produtos.$t,
            address: row.gsx$endereço.$t,
            email: row.gsx$email.$t
          };
          this.sheet.push(v);
        }
      });
      return data;
    }
  },
  beforeMount() {
    this.sheetQuery();
  }
};
</script>

<style scoped>
.t {
  background-color: transparent;
}
</style>