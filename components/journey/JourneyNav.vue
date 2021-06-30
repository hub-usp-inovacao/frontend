<template>
  <div class="d-flex justify-space-around">
    <nuxt-link :to="previous.to" class="icon-link">
      <v-icon>{{ previousIcon }}</v-icon>
      {{ previous.label }}
    </nuxt-link>
    <nuxt-link :to="next.to" class="icon-link">
      <v-icon>{{ nextIcon }}</v-icon>
      {{ next.label }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    previous: {
      type: Object,
      required: true,
    },
    next: {
      type: Object,
      required: true,
    },
  },

  computed: {
    previousIcon() {
      return this.previous.to === "/jornada"
        ? "mdi-circle-outline"
        : "mdi-arrow-left";
    },
    nextIcon() {
      return this.next.to === "/jornada"
        ? "mdi-circle-outline"
        : "mdi-arrow-right";
    },
  },
};
</script>

<style scoped>
.icon-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}
</style>
