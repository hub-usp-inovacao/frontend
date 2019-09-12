<template>
  <v-app>
    <v-container fluid>
      <v-data-iterator :items="sheet" :search="search" :items-per-page="16" single-expand>
        <template v-slot:header>
          <v-toolbar>
            <v-text-field v-model="search" hide-details append-icon="search" label="Search"></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="(item, i) in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
              tile
            >
              <v-card>
                <v-container v-if="item.logo">
                  <v-img :src="item.logo"></v-img>
                </v-container>

                <v-card-title>
                  <div class="display-1">{{item.name}}</div>
                </v-card-title>

                <v-card-text v-if="item.sector">
                  <span class="grey--text subtitle-1">{{item.sector}}</span>
                </v-card-text>

                <v-card-actions>
                  <v-btn :to="`/empresas/${item.name}`" text>SAIBA MAIS</v-btn>
                  <v-btn v-if="item.url" color="purple" :href="item.url" text>VISITE O SITE</v-btn>
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
            </v-col>
          </v-row>
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
    show: []
  }),
  methods: {
    set() {
      this.sheet = this.s;
      this.headers = this.h;
      this.show = Array(this.size).fill(false);
    },
    showDescription(i) {
      this.$set(this.show, i, !this.show[i]);
    }
  },
  created() {
    this.set();
  }
};
</script>
