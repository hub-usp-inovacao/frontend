<template>
  <div style="height: 20em; position: relative;">
    <!-- <div class="panel_bg"></div> -->

    <v-row class="fill-height" align="end" justify="space-around" no-gutters>
      <v-col cols="10" sm="7">
        <v-row justify="center">
          <v-col cols="11" sm="9">
            <p class="display-2 white--text font-weight-medium">{{propsTitle}}</p>
            <p class="title white--text font-weight-light">{{propsDescription}}</p>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="10" sm="5">
        <v-text-field
          solo
          flat
          rounded
          color="white"
          label="Buscar"
          append-outer-icon="search"
          v-model="typed"
          :style="this.$vuetify.breakpoint.smAndDown ? 'width: 90%' : 'width: 70%'"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    typed: ""
  }),
  props: ["propsTitle", "propsDescription", "propsUrl"],
  watch: {
    typed(p) {
      this.$emit("input", p);
    }
  }
};
</script>

<style scoped>
.panel_bg {
  position: absolute;
  top: 0;

  width: 100%;
  height: 60%;
  /* background: rgb(216, 216, 216); */
  background: rgb(255, 167, 38);
  transform: skewY(-6deg);
  transform-origin: top left;
}
</style>
