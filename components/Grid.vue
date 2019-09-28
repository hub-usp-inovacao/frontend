<template>
  <div>
    <v-data-iterator :items="sheet" :search="typed" :items-per-page="128" hide-default-footer>
      <template v-slot:header>
        <div class="my-12 mx-3">
          <v-text-field
            class="all"
            v-model="search"
            append-icon="search"
            label="Procure Empresas"
            hide-details
            outlined
            clearable
          ></v-text-field>
        </div>
      </template>

      <template v-slot:default="props">
        <v-divider></v-divider>
        <masonry class="my-12 mx-12" :cols="cols">
          <div v-for="item in props.items" :key="item.name">
            <v-hover v-slot:default="{ hover }">
              <!-- <v-container> -->
                <v-card
                  class="all mx-1 my-2"
                  target="_blank"
                  :href="item.url"
                  :elevation="hover ? 1 : 0"
                  tile
                  outlined
                  hover
                  ripple
                >
                  <v-container v-if="item.logo">
                    <v-img :src="item.logo">
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex white--text"
                          style="height: 100%; background-color: #135494; opacity: .9;"
                        >
                          <v-container style="font-size: 0.8em;">{{item.description}}</v-container>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-title style="color: #135494; font-size: 1.0em;">{{item.name}}</v-card-title>

                  <!-- <v-card-text v-if="item.sector">
                    <span class="white--text subtitle-1">{{item.sector}}</span>
                  </v-card-text>-->
                </v-card>
              <!-- </v-container> -->
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
  props: ["propsSheet", "propsHeaders", "propsSize"],
  data: () => ({
    sheet: [],
    headers: [],
    search: "",
    show: [],
    cols: 1,
    typed: ""
  }),
  methods: {
    setProps() {
      this.sheet = this.propsSheet;
      this.headers = this.propsHeaders;
      this.show = Array(this.propsSize).fill(false);
    },
    showDescription(i) {
      this.$set(this.show, i, !this.show[i]);
    },
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          return 5;
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
    this.setProps();
  },
  mounted() {
    this.cols = this.setCols();
  }
};
</script>
