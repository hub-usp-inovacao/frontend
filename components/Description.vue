<template>
  <v-container>
    <h1 class="zoom" style="text-align: center">{{propsTitle}}</h1>
    <p class="my-4 zoom" style="text-align: center">{{propsDescription}}</p>
    <v-btn class="my-4" target="_blank" :href="propsUrl">Cadastre a sua</v-btn>
  </v-container>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl"]
};
</script>
