<template>
  <div class="graybox">{{ caption }}</div>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.graybox {
  width: 100%;
  min-height: 50%;

  margin-top: 2em;
  padding: 1em;

  background-color: lightgray;
}
</style>
