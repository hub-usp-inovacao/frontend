<template>
  <div>
    <v-container class="my-12">
      <v-row>
        <v-col class="my-12">
          <h1 class="all">Empresas da Universidade de São Paulo</h1>
          <p class="all">São as empresas criadas por alunos e ex-alunos USP ao longo dos anos.</p>
          <v-btn
            href="https://docs.google.com/forms/d/e/1FAIpQLSf_0YARRMgCe3Cy6GI03BexcRdjQqR5BOM0qwqCRaSnGoVwJQ/viewform"
          >Cadastre a sua</v-btn>
        </v-col>
        <v-col>
          <!-- <img src="office.jpg" width="400px" height="300px"/> -->
        </v-col>
      </v-row>
      <div class="my-4">
        <v-text-field
          class="all"
          v-model="search"
          append-icon="search"
          label="Procure uma tecnologa ou empresa cadastrada"
          hide-details
          outlined
          clearable
        ></v-text-field>
      </div>
    </v-container>
    <v-data-iterator :items="sheet" :search="typed" :items-per-page="128" hide-default-footer>
      <template v-slot:header></template>

      <template v-slot:default="props">
        <v-divider></v-divider>
        <v-container>
        <masonry class="my-12" :cols="cols">
          <div v-for="item in props.items" :key="item.name">
            <v-hover v-slot:default="{ hover }">
              <v-container>
                <div style="border-style: solid; border-color: #5aa18e;border-radius: 6px;">
                  <v-card
                    class="all"
                    color="#dde8ed"
                    target="_blank"
                    :href="item.url"
                    :elevation="hover ? 2 : 0"
                    outlined
                    hover
                    ripple
                  >
                    <v-container v-if="item.logo">
                      <v-img :src="item.logo">
                        <v-expand-transition>
                          <div
                            v-if="hover"
                            style="height: 100%; border-style: solid; border-color: #ffffff;background-color: #41b089; opacity: .9;border-radius: 12px;"
                          >
                            <v-container
                              class="white--text justify-center"
                              style="font-size: 0.8em; font-weight: bold;"
                            >{{item.description}}</v-container>
                          </div>
                        </v-expand-transition>
                      </v-img>
                    </v-container>

                    <v-divider></v-divider>

                    <v-card-title
                      class="justify-center"
                      style="color: #135494;font-size: 1.2em;"
                    >{{item.name}}</v-card-title>

                    <v-card-text v-if="item.sector">
                      <span class="justify-center black--text subtitle-1">{{item.sector}}</span>
                    </v-card-text>
                  </v-card>
                </div>
              </v-container>
            </v-hover>
          </div>
        </masonry>
        </v-container>
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
