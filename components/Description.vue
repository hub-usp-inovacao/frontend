<template>
  <v-container>
    <h1>{{propsTitle}}</h1>
    <p class="my-4">{{propsDescription}}</p>
    <v-btn class="my-4" target="_blank" :href="propsUrl">Cadastre a sua</v-btn>
  </v-container>
</template>

<script>
export default {
  props: ["propsTitle", "propsDescription", "propsUrl"]
};
</script>
