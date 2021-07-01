<template>
  <v-container>
    <div class="d-flex flex-column">
      <div class="d-flex flex-wrap justify-space-around mb-4">
        <v-btn
          v-for="{ label } in primary"
          :key="label"
          class="white px-6 py-8 ma-1 flex-grow-1 button"
          max-width="100%"
          @click="select"
        >
          {{ label }}
        </v-btn>
      </div>

      <div v-if="secondary" class="d-flex flex-wrap justify-space-around">
        <v-btn
          v-for="{ label } in secondary"
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
      required: true,
      validator: (prop) => {
        return prop instanceof Array || prop instanceof Object;
      },
    },
  },

  data: () => ({
    selectedButton: undefined,
  }),

  computed: {
    selectedText() {
      return this.selectedButton || "selecione um item acima";
    },

    primary() {
      return this.buttons.primary || this.buttons;
    },

    secondary() {
      return this.buttons.secondary;
    },
  },

  methods: {
    select({ target }) {
      this.selectedButton = target.innerText;
    },
  },
};
</script>
