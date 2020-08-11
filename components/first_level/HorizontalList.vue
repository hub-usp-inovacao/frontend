<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <span>{{ title }}</span>
      </v-col>
      <v-col v-for="item in items" :key="item" cols="2">
        <span class="black--text">{{ item }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
