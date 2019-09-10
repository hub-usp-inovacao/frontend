<template>
  <v-container fluid>
    <v-data-iterator :items="sheet" :search="search" single-expand>
      <template v-slot:header>
        <v-toolbar>
          <v-text-field v-model="search" hide-details append-icon="search" label="Search"></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="(item,i) in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            tile
          >
            <v-card>
              <v-img v-if="item.logo" :src="item.logo"></v-img>

              <v-card-title>
                <div>{{item.name}}</div>
                <span class="grey--text subtitle-1">{{item.sector}}</span>
              </v-card-title>

              <v-card-actions>
                <v-btn :to="`/empresas/${item.name}`" text>SAIBA MAIS</v-btn>

                <v-btn v-if="item.url" text color="purple" :href="item.url">VISITE O SITE</v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="showDescription(i)">
                  <v-icon>{{ show[i] ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show[i]">
                  <v-card-text>{{item.description}}</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: ["s", "h", "sz"],
  data: () => ({
    sheet: [],
    headers: [],
    search: "",
    show: []
  }),
  methods: {
    set() {
      this.sheet = this.s;
      this.headers = this.h;
      this.show = Array(this.sz).fill(false);
    },
    showDescription(ind) {
      this.$set(this.show, ind, !this.show[ind]);
      console.log(this.show[ind]);
    }
  },
  created() {
    this.set();
  }
};
</script>
