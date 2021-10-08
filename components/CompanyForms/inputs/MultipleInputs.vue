<template>
  <div>
    <v-row v-for="i in counter" :key="i" align="center">
      <v-col cols="10">
        <component
          :is="component"
          v-model="items[i - 1]"
          clearable
          :label="displayLabel(i)"
          :mask="mask"
          :rule="rule"
        ></component>
      </v-col>
      <v-col cols="2" align="center">
        <v-btn @click="removeItem(i)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="primary" rounded @click="newItem"
      >Adicionar {{ inputLabel }}</v-btn
    >
  </div>
</template>

<script>
import { Component } from "vue";
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import MaskInput from "@/components/CompanyForms/inputs/MaskInput.vue";
import PhoneInput from "@/components/CompanyForms/inputs/PhoneInput.vue";
import URLInput from "@/components/CompanyForms/inputs/URLInput.vue";

export default {
  components: {
    ShortTextInput,
    PhoneInput,
    MaskInput,
    URLInput,
  },
  props: {
    inputLabel: {
      type: String,
      required: true,
    },
    component: {
      type: Component,
      required: false,
      default: () => ShortTextInput,
    },
    rule: {
      type: RegExp,
      required: false,
      default: () => /.*/,
    },
    mask: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    items: [],
    counter: 0,
  }),

  watch: {
    items() {
      this.$emit("items", this.items);
    },
  },

  methods: {
    displayLabel(i) {
      return `${this.inputLabel} ${i}`;
    },

    newItem() {
      this.counter++;
      this.items.push("");
    },

    removeItem(i) {
      const end = this.items.length;
      const head = this.items.slice(0, i - 1);
      const tail = this.items.slice(i, end);

      this.items = head.concat(tail);
      this.counter--;
    },
  },
};
</script>

<style></style>
