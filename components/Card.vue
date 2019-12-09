<template>
  <v-container>
    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 5 : 0"
        target="_blank"
        :href="propsItem.url"
        outlined
        ripple
      >
        <div v-if="propsImage">
          <v-container>
            <v-img :src="propsItem.logo" contain max-height="25vh">
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="primary">
                  <v-btn style="font-weight: bold">Visite o site</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </v-container>

          <v-divider />
        </div>

        <v-container>
          <div
            v-if="propsFont"
            align="center"
            class="hoverUnderline justify-center font-regular"
            style="font-size: 17px"
          >{{propsItem.name}}</div>
          <v-card-title
            v-else
            align="center"
            class="hoverUnderline justify-center title primary--text"
          >{{propsItem.name}}</v-card-title>

          <div
            align="center"
            class="font-weight-thin"
            style="text-transform: lowercase; font-size: 14px"
          >{{propsItem.category}}</div>
        </v-container>

        <div align="center" class="font-weight-light" style="background-color: white; font-size: 14px">
          <v-container>{{propsItem.description}}</v-container>
        </div>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: ["propsItem", "propsImage", "propsColor", "propsFont"]
};
</script>
