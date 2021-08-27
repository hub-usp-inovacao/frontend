<template>
  <div>
    <v-radio-group v-if="valueFalse != undefined" v-model="booleanRadio" column>
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
      :label="valueTrue"
      :color="color"
      :value="value"
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
      required: true,
    },
    valueFalse: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: "blue",
    },
  },

  data: () => ({
    booleanRadio: null,
    booleanSwitch: false,
  }),
};
</script>

<style></style>
