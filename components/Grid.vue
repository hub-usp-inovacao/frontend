<template>
  <div>
    <v-data-iterator :items="sheet" :search="typed" :items-per-page="128" hide-default-footer>
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
        <masonry :cols="cols">
          <div v-for="item in props.items" :key="item.name">
            <v-hover v-slot:default="{ hover }">
              <v-container>
                <v-card class="all" target="_blank" :href="item.url" tile outlined hover ripple>
                  <v-container v-if="item.logo">
                    <v-img :src="item.logo">
                      <v-expand-transition>
                        <div v-if="hover" class="d-flex primary white--text" style="height: 100%;">
                          <v-container>{{item.description}}</v-container>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-container>

                  <v-card-title class="primary--text">{{item.name}}</v-card-title>

                  <v-card-text v-if="item.sector">
                    <span class="grey--text subtitle-1">{{item.sector}}</span>
                  </v-card-text>
                </v-card>
              </v-container>
            </v-hover>
          </div>
        </masonry>
      </template>
    </v-data-iterator>
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
    typed: "",
    mycolor: ""
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
    },
    generator: function(event) {
      return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
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
border-radius: 50px;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

<style>
