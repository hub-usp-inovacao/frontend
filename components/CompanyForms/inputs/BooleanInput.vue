<template>
  <div>
    <input
      id="true"
      v-model="value"
      type="radio"
      :value="valueTrue"
      input="$emit('input', $event)"
    />
    <label for="true">{{ valueTrue }}</label>
    <br />
    <input
      id="false"
      v-model="value"
      type="radio"
      :value="valueFalse"
      input="$emit('input', $event)"
    />
    <label for="false">{{ valueFalse }}</label>
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

  data: () => ({
    value: null,
  }),
};
</script>

<style></style>
