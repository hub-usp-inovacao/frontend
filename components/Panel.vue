<template>
  <v-container fill-height fluid style="position: relative; min-height: 20rem">
    <v-row class="ma-0 mt-12" align="center" justify="space-around" no-gutters>
      <v-col>
        <v-row class="ma-0" justify="center">
          <v-col cols="12" sm="9">
            <p class="display-2 font-weight-regular">{{title}}</p>

            <p class="title font-weight-light" style="line-height: normal;">{{description}}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="11" sm="5" align-self="end">
        <v-row class="ma-0">
          <v-col>
            <v-text-field
              background-color="#88E3FF"
              solo
              flat
              rounded
              color="black"
              label="Buscar"
              counter="32"
              v-model="typed"
              append-outer-icon="search"
              :style="setSearchBarWidth"
              :loading="loading"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    typed: ""
  }),
  props: ["title", "description", "url", "loading"],
  watch: {
    typed(p) {
      this.$emit("input", p);
    }
  },
  computed: {
    setSearchBarWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return { width: "100%" };
        case "sm":
          return { width: "80%" };
        default:
          return { width: "70%" };
      }
    }
  }
};
</script>

<style scoped>
</style>
