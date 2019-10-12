<template>
  <div>
    <v-container>
      <v-hover v-slot:default="{ hover }">
        <v-card
          :color="propsColor"
          target="_blank"
          :href="propsItem.url"
          elevation="1"
          outlined
          ripple
        >
          <div v-if="propsImage">
            <v-container>
              <v-img :src="propsItem.logo">
                <v-fade-transition>
                  <v-overlay v-if="hover" absolute color="primary">
                    <v-btn style="font-weight: bold">Visite o site</v-btn>
                  </v-overlay>
                </v-fade-transition>
              </v-img>
            </v-container>

            <v-divider />
          </div>

          <v-card-title v-if="propsFont" align="center" class="hoverUnderline justify-center title white--text">{{propsItem.name}}</v-card-title>
          <v-card-title v-else align="center" class="hoverUnderline justify-center title primary--text">{{propsItem.name}}</v-card-title>

          <v-card-text align="center" v-if="propsItem.description">
            <span>{{propsItem.description}}</span>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["propsItem", "propsImage", "propsColor", "propsFont"]
};
</script>
