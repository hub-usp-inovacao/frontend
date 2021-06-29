<template>
  <v-container>
    <div class="d-flex flex-column">
      <div id="buttons" class="d-flex flex-wrap justify-space-around">
        <v-btn
          v-for="b in buttons"
          :key="b"
          class="white px-10 py-10 ma-1 flex-grow-1"
          @click="select"
        >
          {{ b }}
        </v-btn>
      </div>
      <v-card class="mt-4 rounded-lg">
        <v-card-text>
          {{ selectedText }}
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedButton: undefined,
    buttons: "CIETEC ESALQTEC HABITS SUPERA".split(" "),
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
