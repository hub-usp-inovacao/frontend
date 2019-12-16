<template>
  <v-app>
    <v-img :src="propsImg" height="100vh" aspect-ratio="1">
      <v-row class="fill-height">
        <v-col class="blue-background" align-self="stretch">
          <v-row class="fill-height">
            <v-col align-self="center">
              <v-container mx-5>
                <p
                  class="white--text font-weight-bold"
                  style=" text-transform: uppercase;
                          font-size: 40px;"
                >{{propsTitle}}</p>
                <p class="title white--text font-weight-light">{{propsDescription}}</p>
                <v-btn
                  depressed
                  tile
                  dark
                  color="rgba(239, 127, 45, 0.84)"
                  target="_blank"
                  :href="propsUrl"
                >Cadastre-se</v-btn>
              </v-container>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer class="hidden-sm-and-down" />
      </v-row>
    </v-img>
  </v-app>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl", "propsImg"]
};
</script>

<style scoped>
.blue-background {
  background-color: rgba(29, 112, 191, 0.7);
}
.fill-height {
  height: 100%;
}
</style>
