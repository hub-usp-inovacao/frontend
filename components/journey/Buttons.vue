<template>
  <v-container>
    <div class="d-flex flex-column">
      <div id="buttons" class="d-flex flex-wrap justify-space-around">
        <v-btn
          v-for="{ label } in buttons"
          :key="label"
          class="white px-6 py-8 ma-1 flex-grow-1 button"
          max-width="100%"
          @click="select"
        >
          {{ label }}
        </v-btn>
      </div>
      <v-card
        class="mt-4 rounded-lg d-flex justify-center align-center"
        height="30vh"
      >
        <v-card-text class="text-center">
          {{ selectedText }}
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    selectedButton: undefined,
  }),

  computed: {
    selectedText() {
      return this.selectedButton || "selecione um item acima";
    },
  },

  methods: {
    select({ target }) {
      this.selectedButton = target.innerText;
    },
  },
};
</script>
