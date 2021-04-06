<template>
  <v-container :class="containerClass">
    <v-card
      style="background-color: transparent"
      width="7rem"
      flat
      tile
      nuxt
      to="/"
    >
      <v-img
        contain
        eager
        max-width="6rem"
        class="mx-auto"
        :src="require('@/vectors/hub_logo.svg')"
        alt="Hub USPInovação"
      ></v-img>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    margin: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    containerClass() {
      const deviceSize = this.$vuetify.breakpoint.name;
      if ((deviceSize != "lg" && deviceSize != "xl") || !this.margin) {
        return "ml-0";
      }
      return "";
    },
  },
};
</script>
