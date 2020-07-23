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
              :backgroundColor="searchBarColor"
              solo
              flat
              rounded
              color="tertiary"
              :label="'Buscar - ' + title"
              counter="32"
              v-model="value"
              append-outer-icon="search"
              :style="setSearchBarWidth"
              :loading="loading"
              hint="Resultados de busca na caixa abaixo"
              persistent-hint
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { debounce } from "debounce";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchBarColor: {
      type: String,
      default: "#88E3FF"
    },
    value: {
      type: String,
      required: true,
      default: ""
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
  },
  watch: {
    value: debounce(function() {
      this.$emit("input", this.value);
    }, 500)
  }
};
</script>

<style scoped>
</style>
