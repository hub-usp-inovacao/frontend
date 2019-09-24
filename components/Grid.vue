<template>
  <v-app>
    <v-container fluid>
      <v-data-iterator :items="sheet" :search="search" :items-per-page="16" single-expand>
        <template v-slot:header>
          <v-text-field v-model="search" hide-details append-icon="search" label="Search" outlined></v-text-field>
        </template>

        <template v-slot:default="props">
          <masonry :cols="cols">
            <div v-for="(item, i) in props.items" :key="item">
              <v-container>
                <v-card tile outlined>
                  <v-container v-if="item.logo" fluid>
                    <v-img :src="item.logo"></v-img>
                  </v-container>

                  <v-card-title>
                    {{item.name}}
                  </v-card-title>

                  <v-card-text v-if="item.sector">
                    <span class="grey--text subtitle-1">{{item.sector}}</span>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :to="`/empresas/${item.name}`" text>SAIBA MAIS</v-btn>
                    <v-btn v-if="item.url" color="primary" :href="item.url" text>VISITE O SITE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="item.description" icon @click="showDescription(i);">
                      <v-icon>{{ show[i] ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show[i]">
                      <v-card-text class="body-2">{{item.description}}</v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-container>
            </div>
          </masonry>
        </template>
      </v-data-iterator>
    </v-container>
  </v-app>
</template>

<script>
export default {
  props: ["s", "h", "size"],
  data: () => ({
    sheet: [],
    headers: [],
    search: "",
    show: [],
    cols: 1
  }),
  methods: {
    set() {
      this.sheet = this.s;
      this.headers = this.h;
      this.show = Array(this.size).fill(false);
    },
    showDescription(i) {
      this.$set(this.show, i, !this.show[i]);
    },
    set_cols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 4;
        case "xl":
          return 5;
      }
    }
  },
  created() {
    this.set();
  },
  mounted() {
    this.cols = this.set_cols();
  }
};
</script>

<style scoped>
.v-card {
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
}
</style>