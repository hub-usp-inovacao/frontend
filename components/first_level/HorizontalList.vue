<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <span>{{ title }}</span>
      </v-col>
      <v-col cols="2" v-for="item in items" :key="item">
        <span class="black--text">{{ item }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["items", "title"],
};
</script>