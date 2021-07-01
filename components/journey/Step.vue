<template>
  <main class="bg-gray">
    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="6">
              <div
                :style="headerStyle"
                class="py-4 text-center white--text font-weight-bold text-h2 rounded-lg"
              >
                {{ title }}
              </div>
            </v-col>
            <v-col cols="2">
              <div
                style="margin-left: 15vw; height: 100%"
                class="py-4 rounded-lg orange"
              ></div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col>{{ description }}</v-col>
          </v-row>
          <v-row>
            <v-col>
              <JourneyNav :next="nextLink" :previous="previousLink" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <Buttons :buttons="buttons"></Buttons>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="hidden-md-and-up">
      <v-row>
        <v-col cols="12">
          <div
            :style="headerStyle"
            class="py-4 text-center white--text font-weight-bold text-h4 rounded-lg"
          >
            {{ title }}
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          {{ description }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Buttons :buttons="buttons"></Buttons>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <JourneyNav :next="nextLink" :previous="previousLink" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import JourneyNav from "@/components/journey/JourneyNav.vue";
import Buttons from "@/components/journey/Buttons.vue";

export default {
  components: {
    JourneyNav,
    Buttons,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    buttons: {
      required: true,
      validator: (prop) => {
        return prop instanceof Array || prop instanceof Object;
      },
    },
    next: {
      type: String,
      required: true,
    },
    previous: {
      type: String,
      required: true,
    },
  },

  computed: {
    nextLink() {
      if (this.next) {
        return { label: "Avançar", to: this.next };
      }

      return { label: "Voltar ao menu", to: "/jornada" };
    },

    previousLink() {
      if (this.previous) {
        return { label: "Voltar", to: this.previous };
      }

      return { label: "Voltar ao menu", to: "/jornada" };
    },

    headerStyle() {
      return {
        marginLeft: "-10vw",
        backgroundColor: this.color,
      };
    },
  },
};
</script>

<style scoped>
.bg-gray {
  background-color: #ececec;
}
</style>
