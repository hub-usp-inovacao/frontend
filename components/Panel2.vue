<template>
  <v-app class="blue-background">
    <v-row no-gutters>
      <!-- <v-col align-self="center">
        <v-container px-10>
          <p class="display-2 white--text">{{propsTitle}}</p>
          <p class="title white--text font-weight-light">{{propsDescription}}</p>
          <v-btn depressed dark color="#da1955" :href="propsUrl">Cadastre-se</v-btn>
        </v-container>
      </v-col>-->

      <v-col>
        <v-img :src="propsImg" height="100vh" aspect-ratio="1">
          <div class="rectangle">
            <v-container style="position: relative; top: 30%;" class="px-10">
              <v-container
                class="font-weight-bold"
                style="font-size: 40px; color: white; text-transform: uppercase;"
              >{{propsTitle}}</v-container>
              <v-container>
                <p class="title white--text font-weight-light">{{propsDescription}}</p>
              </v-container>
              <v-container>
                <v-btn depressed dark color="rgba(239, 127, 45, 0.84)" :href="propsUrl">Cadastre-se</v-btn>
              </v-container>
            </v-container>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl", "propsImg"]
};
</script>

<style scoped>
.blue-background {
  background-color: #2b80d1;
}

.rectangle {
  height: 100vh;
  width: 50%;
  background-color: rgba(29, 112, 191, 0.7);
  position: relative;
  /*left: 200px;*/
}
</style>
