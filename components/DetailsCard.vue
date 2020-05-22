<template>
  <div>
    <v-card v-if="hasItem" height="35rem" class="d-flex flex-column">
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-subtitle>
        <v-chip-group v-if="item.keywords && item.keywords.length > 0">
          <v-chip v-for="kw in item.keywords" :key="kw">{{ kw }}</v-chip>
        </v-chip-group>
      </v-card-subtitle>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-around">
        <slot name="buttons"></slot>
      </v-card-actions>
    </v-card>
    <v-card v-else height="35rem" class="d-flex flex-column justify-center">
      <not-found></not-found>
    </v-card>
  </div>
</template>

<script>
import NotFound from "./NotFound.vue";

export default {
  components: {
    NotFound
  },
  props: ["item"],
  computed: {
    hasItem() {
      return this.item !== null && this.item !== undefined;
    }
  }
};
</script>