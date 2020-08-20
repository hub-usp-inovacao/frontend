<template>
  <v-card tile flat>
    <v-container>
      <nuxt-link :to="item.dest">
        <v-row align="center" class="pb-0">
          <v-col cols="4" lg="3">
            <img width="100%" :src="require(`@/vectors/${item.iconSrc}`)">
          </v-col>
          <v-col offset-lg="1">
            <v-row>
              <v-col>
                <v-card-title
                  class="text-left font-weight-regular secondary--text">
                  {{ item.title }}
                </v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-text class="text-left font-weight-light black--text">
                  {{ item.description }}
                </v-card-text>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </nuxt-link>
      <v-row v-if="hasCallToAction">
        <v-col cols="12" offset-lg="4" lg="8" class="pt-0 mt-n6">
          <v-card-actions>
            <v-btn
              rounded
              width="100%"
              class="py-6 font-weight-bold"
              color="secondary"
              target="_blank"
              :href="item.formsURL">
              {{ item.formsCall }}
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  computed: {
    hasCallToAction() {
      const { formsURL, formsCall } = this.item;

      return formsURL !== undefined &&
        formsURL !== "" &&
        formsCall !== undefined &&
        formsCall !== "";
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
