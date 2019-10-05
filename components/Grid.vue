<template>
  <div>
    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma tecnologia ou empresa cadastrada"
        hide-details
        outlined
        clearable
      ></v-text-field>

      <v-row>
        <v-col>
          <v-select label="Incubadora" outlined></v-select>
        </v-col>
        <v-col>
          <v-select label="Campus" outlined></v-select>
        </v-col>
        <v-col>
          <v-select label="Unidade" outlined></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-data-iterator
      :class="margin"
      :items="propsSheet"
      :search="typed"
      :items-per-page="itemsPerPage"
      :page="page"
      hide-default-footer
    >
      <template v-slot:default="props">
        <masonry :class="margin2" :cols="columns">
          <div v-for="item in props.items" :key="item.name">
            <v-container>
              <v-hover v-slot:default="{ hover }">
                <v-card target="_blank" :href="item.url" elevation="1" outlined ripple>
                  <v-img :src="item.logo">
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="primary">
                        <v-btn style="font-weight: bold">Visite o site</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-img>

                  <v-divider></v-divider>

                  <v-card-title
                    class="hoverUnderline justify-center title primary--text"
                  >{{item.name}}</v-card-title>

                  <v-card-text v-if="item.description">
                    <span>{{item.description}}</span>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-container>
          </div>
        </masonry>
        <v-pagination v-model="page" :length="numberOfPages"></v-pagination>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: ["propsSheet"],
  data: () => ({
    search: "",
    columns: 1,
    typed: "",
    margin: "",
    margin2: "",
    page: 1,
    numberOfPages: 1,
    itemsPerPage: 32
  }),
  methods: {
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.margin2 = "my-12";
          return 1;
        case "sm":
          this.margin2 = "my-12";
          return 2;
        case "md":
          this.margin2 = "my-12";
          return 2;
        case "lg":
          this.margin = "mx-6";
          this.margin2 = "my-12 mx-12";
          return 3;
        case "xl":
          this.margin = "mx-6";
          this.margin2 = "my-12 mx-12";
          return 3;
      }
    }
  },
  watch: {
    search: debounce(function() {
      this.typed = this.search;
    }, 400),
    propsSheet() {
      this.numberOfPages = Math.ceil(
        this.propsSheet.length / this.itemsPerPage
      );
    }
  },
  mounted() {
    this.columns = this.setCols();
  }
};
</script>

<style scoped>
.hoverUnderline:hover {
  text-decoration: underline;
}
</style>
