<template>
  <v-app class="blue-background">
    <v-row no-gutters>
      <v-col align-self="center">
        <v-container px-10>
          <p class="display-2 white--text">{{propsTitle}}</p>
          <p class="title white--text font-weight-light">{{propsDescription}}</p>
          <v-btn depressed dark color="#da1955" :href="propsUrl">Cadastre-se</v-btn>
        </v-container>
      </v-col>
      <v-col align-self="stretch">
        <v-img :src="propsImg" aspect-ratio="1"></v-img>
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
</style>