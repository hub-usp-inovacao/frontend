<template>
  <v-container>
    <h1 class="zoom" style="text-align: center">{{propsTitle}}</h1>
    <p class="my-4 zoom" style="text-align: center">{{propsDescription}}</p>
    <v-row justify="center">
      <v-btn class="my-4" target="_blank" :href="propsUrl">Cadastre a sua</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl"]
};
</script>
