<template>
  <div>
    <h2 class="text-h4 mt-8 mb-8">{{ title }}</h2>
    <div>
      <v-row v-for="i in counter" :key="i" align="center">
        <v-col cols="10">
          <ShortTextInput
            v-model="items[i - 1]"
            clearable
            :label="displayLabel(i)"
          />
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
  </div>
</template>

<script>
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";

export default {
  components: {
    ShortTextInput,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    inputLabel: {
      type: String,
      required: true,
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
