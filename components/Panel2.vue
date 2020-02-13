<template>
  <v-app>
    <div class="panel_bg"></div>
    <div style="height: 100%; position: relative;">
      <v-row class="fill-height" align="center" justify="space-around" no-gutters>
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
            :style="this.$vuetify.breakpoint.smAndDown ? 'width: 90%' : 'width: 70%'"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl", "propsImg"]
};
</script>

<style scoped>
.panel_bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: rgb(216, 216, 216); */
  background: rgba(255, 167, 38, 1);
  transform: skewY(-6deg);
  transform-origin: top left;
}
</style>
