<template>
  <v-list>
    <v-subheader>{{ title }}</v-subheader>
    <v-list-item-group>
      <v-list-item v-for="item in items" :key="item">
        <v-list-item-icon>
          <v-icon v-text="'mdi-circle-small'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: ["title", "items"]
};
</script>