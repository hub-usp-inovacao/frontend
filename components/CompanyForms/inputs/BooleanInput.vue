<template>
  <div>
    <v-radio-group
      v-if="switchLabel == undefined"
      v-model="booleanRadio"
      column
    >
      <v-radio
        :label="valueTrue"
        :color="color"
        :value="value"
        input="$emit('input', $event)"
      >
      </v-radio>
      <v-radio
        :label="valueFalse"
        :color="color"
        :value="value"
        input="$emit('input', $event)"
      >
      </v-radio>
    </v-radio-group>
    <v-switch
      v-else
      :v-model="booleanSwitch"
      :label="switchLabel"
      :color="color"
      input="$emit('input', $event)"
    >
    </v-switch>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    valueTrue: {
      type: String,
    },
    valueFalse: {
      type: String,
    },
    switchValue: {
      type: String,
    },
    color: {
      type: String,
      default: "blue",
    },
    switchLabel: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    booleanRadio: null,
    booleanSwitch: false,
  }),
};
</script>

<style></style>
