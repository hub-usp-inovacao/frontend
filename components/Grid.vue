<template>
  <v-container fluid>
    <v-data-iterator
      :items="sheet"
      :search="search"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card class="mx-auto" max-width="344">
              <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

              <v-card-title>
                <div>Top western road trips</div>
                <span class="grey--text subtitle-1">1,000 miles of wonder</span>
              </v-card-title>

              <v-card-actions>
                <v-btn text>Share</v-btn>

                <v-btn text color="purple">Explore</v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
            <!-- <v-card>
            <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>-->

            <!-- <v-divider></v-divider> -->

            <!-- <v-list dense>
                <v-list-item
                  v-for="(key, index) in filteredKeys"
                  :key="index"
                  :color="sortBy === key ? `blue lighten-4` : `white`"
                >
                  <v-list-item-content>{{ key }}:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
            </v-list>-->
            <!-- </v-card> -->
          </v-col>
        </v-row>
      </template>

      <!-- <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            class="mr-4
            grey--text"
          >
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="mr-1"
            @click="formerPage"
          >
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            color="blue darken-3"
            class="ml-1"
            @click="nextPage"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </v-row>
      </template>-->
    </v-data-iterator>
  </v-container>
</template>

<script>
export default {
  props: ["s", "h"],
  data: () => ({
    sheet: [],
    headers: [],
    search: ""
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
