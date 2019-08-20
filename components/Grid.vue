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
          <v-col v-for="item in props.items" :key="item.name" sm="6" md="4" lg="3" tile>
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

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
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
  props: ['s', 'h'],
  data: () => ({
    sheet: [],
    headers: [],
    search: '',
    show: false
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
