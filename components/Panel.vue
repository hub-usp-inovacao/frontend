<template>
  <div style="height: 20rem; position: relative;">
    <v-row class="fill-height ma-0" align="end" justify="space-around" no-gutters>
      <v-col cols="10" sm="7">
        <v-row justify="center">
          <v-col cols="11" sm="9">
            <p class="display-1 white--text font-weight-medium">{{title}}</p>

            <p class="title white--text font-weight-light">{{description}}</p>

            <v-btn v-if="url" :href="url" rounded large depressed color="secondary">
              <span class="white--text">Conecte-se</span>
            </v-btn>
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
          counter="32"
          v-model="typed"
          append-outer-icon="search"
          :loading="loading"
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
  props: ["title", "description", "url", "loading"],
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
  height: 40rem;

  background: #ffa726;
  transform: skewY(-5deg);
  transform-origin: top left;
}
</style>
