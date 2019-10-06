<template>
  <div>
    <v-container ref="start">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Procure uma tecnologia ou empresa cadastrada"
        hide-details
        outlined
        clearable
      ></v-text-field>

      <div v-if="this.$vuetify.breakpoint.name == 'xs'">
        <v-card class="mx-auto overflow-hidden" height="400" width="344">
          <v-system-bar color="deep-purple darken-3"></v-system-bar>

          <v-app-bar color="deep-purple accent-4" dark prominent>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>My files</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-filter</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-navigation-drawer v-model="drawer" absolute bottom temporary>
            <v-list nav dense>
              <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <v-list-item>
                  <v-list-item-title>Foo</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Bar</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Fizz</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Buzz</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>

          <v-card-text>The navigation drawer will appear from the bottom on smaller size screens.</v-card-text>
        </v-card>
        <v-bottom-navigation v-model="bottomNav" fixed>
          <v-btn value="recent">
            <span>Iniciativas</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn value="favorites">
            <span>D&I</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn value="nearby">
            <span>Educação</span>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>

          <v-btn value="nearby">
            <span>Empresas</span>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
        </v-bottom-navigation>

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

      <div v-else>
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
    options: {},
    drawer: false,
    group: null
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
    },
    group() {
      this.drawer = false;
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
