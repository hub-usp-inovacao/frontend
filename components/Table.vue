<template>
  <v-app>
    <v-form>
      <v-text-field label="Pesquisa" v-model="search" append-icon="search"></v-text-field>
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
              <div>
                <h3>{{props.item.name}}</h3>
                <h4>{{props.item.sector}}</h4>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn>Saiba Mais</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </template>
      <template v-slor:no-results>
        <v-alert :value="true" color="error" icon="warning">Not found</v-alert>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    sheet: [],
    search: "",
    headers: [{ value: "name" }, { value: "sector" }]
  }),
  methods: {
    async sheetQuery() {
      console.log(url);
      const request = await fetch(url);
      const data = await request.json();
      console.log(data.feed.entry);
      data.feed.entry.forEach(row => {
        let v = {
          name: row.gsx$nomefantasia.$t,
          sector: row.gsx$setordeatuaçãocnae.$t
        };
        this.sheet.push(v);
      });
      return data;
    }
  },
  async beforeMount() {
    await this.sheetQuery();
  }
};
</script>