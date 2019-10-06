<template>
  <div>
    <v-divider ref="start" class="mb-6"></v-divider>

    <v-container>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma tecnologia ou empresa cadastrada"
        hide-details
        outlined
        clearable
      ></v-text-field>

      <div class="hidden-md-and-up">
        <v-select
          class="my-4"
          :items="propsIncubator"
          label="Incubadora"
          v-model="selectIncubator"
          outlined
          hide-details
        ></v-select>
        <v-select
          class="my-4"
          :items="propsCampus"
          label="Campus"
          v-model="selectCampus"
          outlined
          hide-details
        ></v-select>
        <v-select
          class="my-4"
          :items="propsUnity"
          label="Unidade"
          v-model="selectUnity"
          outlined
          hide-details
        ></v-select>
      </div>

      <div class="hidden-sm-and-down">
        <v-row>
          <v-col>
            <v-select
              :items="propsIncubator"
              label="Incubadora"
              v-model="selectIncubator"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="propsCampus"
              label="Campus"
              v-model="selectCampus"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col>
            <v-select
              :items="propsUnity"
              label="Unidade"
              v-model="selectUnity"
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </div>

      <v-btn @click="clearFilters()">Limpar filtros</v-btn>
    </v-container>

    <!-- <v-divider class="mt-6"></v-divider> -->

    <v-data-iterator
      :class="margin"
      :items="propsSheet"
      :items-per-page="itemsPerPage"
      :page="page"
      :custom-filter="customFilter"
      hide-default-footer
    >
      <template v-slot:default="props">
        <masonry :class="margin2" :cols="columns">
          <div v-for="item in props.items" :key="item.name">
            <v-container>
              <v-hover v-slot:default="{ hover }">
                <v-card target="_blank" :href="item.url" elevation="1" outlined ripple>
                  <v-container>
                    <v-img :src="item.logo">
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="primary">
                          <v-btn style="font-weight: bold">Visite o site</v-btn>
                        </v-overlay>
                      </v-fade-transition>
                    </v-img>
                  </v-container>

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

        <v-pagination
          v-model="page"
          :length="numberOfPages(props.pagination.itemsLength)"
          total-visible="7"
        ></v-pagination>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: ["propsSheet", "propsIncubator", "propsCampus", "propsUnity"],
  data: () => ({
    search: "",
    columns: 1,
    typed: "",
    margin: "",
    margin2: "",
    page: 1,
    itemsPerPage: 32,
    selectIncubator: "",
    selectCampus: "",
    selectUnity: "",
    options: {}
  }),
  methods: {
    setCols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 2;
        case "md":
          return 3;
        case "lg":
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 3;
        case "xl":
          this.margin = "mx-9";
          this.margin2 = "mx-12";
          return 4;
      }
    },
    customFilter(items, search) {
      let filtered = [];
      items.forEach(item => {
        if (
          (!this.selectIncubator || item.incubator == this.selectIncubator) &&
          (!this.selectCampus || item.campus == this.selectCampus) &&
          (!this.selectUnity || item.unity == this.selectUnity) &&
          (!this.typed || this.filterBySearch(item))
        )
          filtered.push(item);
      });
      return filtered;
    },
    filterBySearch(item) {
      let strings = Object.values(item);
      for (let i = 0; i < strings.length; i++)
        if (strings[i].toLowerCase().includes(this.search)) return true;
      return false;
    },
    clearFilters() {
      this.search = "";
      this.selectIncubator = "";
      this.selectCampus = "";
      this.selectUnity = "";
    },
    numberOfPages(length) {
      return Math.ceil(length / this.itemsPerPage);
    }
  },
  watch: {
    search: debounce(function() {
      this.typed = this.search;
    }, 400),
    page() {
      this.$vuetify.goTo(this.$refs.start, this.options);
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
