<template>
  <div>
    <div class="circle colored" :style="colorStyle">{{ index }}</div>
    <v-card class="pt-6 colored three-lines" :style="colorStyle">
      <v-card-title class="full-width">
        <p class="text-center">
          {{ titleUpper }}
        </p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    titleUpper() {
      return this.title.toUpperCase();
    },
    colorStyle() {
      return { backgroundColor: this.color };
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}

p {
  width: 100%;
}

.three-lines {
  height: 10em;

  display: flex;
  justify-items: center;
  align-items: center;
}

.colored {
  color: white;
}

.circle {
  font-weight: bold;

  border: 0.25em solid white;
  border-radius: 1.5em;

  width: 3em;
  height: 3em;

  margin: -1em -1em;
  z-index: 999;

  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
