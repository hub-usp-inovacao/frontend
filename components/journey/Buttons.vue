<template>
  <v-div>
    <v-row>
      <v-col class="pt-0">
        <v-row justify="center">
          <v-col cols="6">
            <div class="d-flex flex-wrap justify-space-around">
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
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="pt-0">
            <div v-if="secondary" class="d-flex flex-wrap justify-space-around">
              <v-btn
                v-for="{ label } in secondary"
                :key="label"
                class="white px-6 py-6 ma-1 flex-grow-1 button"
                max-width="100%"
                @click="select"
              >
                {{ label }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          class="rounded-lg d-flex justify-center align-center"
          height="30vh"
        >
          <v-card-text class="text-center">
            {{ selectedText }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-div>
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
      return this.buttons.primary;
    },

    secondary() {
      return this.buttons.secondary || this.buttons;
    },
  },

  methods: {
    select({ target }) {
      this.selectedButton = target.innerText;
    },
  },
};
</script>
