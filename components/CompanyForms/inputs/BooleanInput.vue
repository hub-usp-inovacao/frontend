<template>
  <div>
    <input type="radio" :value="valueTrue" input="$emit('input', $event)" />
    <input type="radio" :value="valueFalse" input="$emit('input', $event)" />
  </div>
</template>

<script>
export default {
  props: {
    valueTrue: {
      type: String,
      required: true,
    },
    valueFalse: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
