<template>
  <v-container>
    <v-hover v-slot:default="{ hover }">
      <v-card :elevation="hover ? 5 : 2" target="_blank" :href="propsItem.url" ripple>
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
            class="justify-center font-weight-regular"
            style="font-size: 17px; color: rgba(29, 112, 191)"
          >{{propsItem.name}}</div>

          <div
            v-else
            align="center"
            class="font-weight-bold"
            style="font-size: 20px; color: rgba(29, 112, 191)"
          >{{propsItem.name}}</div>

          <div
            align="center"
            class="font-weight-thin"
            style="text-transform: lowercase; font-size: 14px; color: grey"
          >{{propsItem.tech}}</div>
        </v-container>

        <v-container>
          <div
            align="center"
            class="font-weight-thin"
            style="background-color: white; font-size: 14px; color: grey"
          >
            <v-container>{{propsItem.description}}</v-container>
          </div>
        </v-container>
      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
export default {
  props: ["propsItem", "propsImage", "propsColor", "propsFont"]
};
</script>
