<template>
  <div>
    <v-container class="test">
      <v-data-iterator :items="sheet" :search="typed" :items-per-page="32">
        <template v-slot:header>
          <v-text-field
            class="all"
            v-model="search"
            append-icon="search"
            label="Search"
            hide-details
            outlined
            clearable
            solo
          ></v-text-field>
        </template>

        <template v-slot:default="props">
          <masonry :cols="cols">
            <div v-for="(item, i) in props.items" :key="item.name">
              <v-container>
                <v-card class="all alo" elevation="3" @click="showDescription(i);" :hover="false">
                  <v-container v-if="item.logo">
                    <v-img :src="item.logo"></v-img>
                  </v-container>

                  <v-card-title class="primary--text">{{item.name}}</v-card-title>

                  <v-card-text v-if="item.sector">
                    <span class="grey--text subtitle-1">{{item.sector}}</span>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :to="`/empresas/${item.name}`" text>SAIBA MAIS</v-btn>
                    <v-btn v-if="item.url" color="primary" :href="item.url" text>VISITE O SITE</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-if="item.description" icon>
                      <v-icon>{{ show[i] ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                    </v-btn>
                  </v-card-actions>

                  <v-expand-transition>
                    <div v-show="show[i]">
                      <v-card-text>{{item.description}}</v-card-text>
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-container>
            </div>
          </masonry>
        </template>
      </v-data-iterator>
    </v-container>
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: ["s", "h", "size"],
  data: () => ({
    sheet: [],
    headers: [],
    search: "",
    show: [],
    cols: 1,
    typed: ""
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
    },
    refillArray() {
      this.show.fill(false);
    }
  },
  watch: {
    search() {
      this.refillArray();
    },
    search: debounce(function() {
      this.typed = this.search;
    }, 400)
  },
  created() {
    this.set();
  },
  mounted() {
    this.cols = this.set_cols();
  }
};
</script

<style scoped>
.alo {
border-radius: 500px;
}
<style>