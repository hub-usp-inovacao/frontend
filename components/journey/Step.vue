<template>
  <main class="bg-gray">
    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col>
          <v-row :class="roadmap">
            <v-col cols="6">
              <div
                :style="headerStyle"
                class="py-4 text-center white--text font-weight-bold text-h4 rounded-lg"
              >
                {{ title }}
              </div>
            </v-col>
            <v-col v-if="nextColor != '#212121'" offset="5" cols="1">
              <div :style="peakabooStyle" class="rounded-lg"></div>
            </v-col>
            <v-col v-else cols="6">
              <Party style="height: 60%; max-height: 60%" />
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
              <JourneyNav
                :next="nextLink"
                :previous="previousLink"
                :next-color="nextColor"
                :previous-color="previousColor"
              />
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
          <JourneyNav
            :next="nextLink"
            :previous="previousLink"
            :next-color="nextColor"
            :previous-color="previousColor"
          />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import JourneyNav from "@/components/journey/JourneyNav.vue";
import Buttons from "@/components/journey/Buttons.vue";
import Party from "@/components/journey/Party.vue";

export default {
  components: {
    JourneyNav,
    Buttons,
    Party,
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
    nextColor: {
      type: String,
      default: "#212121",
    },
    previousColor: {
      type: String,
      default: "#212121",
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
        backgroundColor: this.color,
      };
    },

    peakabooStyle() {
      return {
        height: "100%",
        backgroundColor: this.nextColor,
      };
    },

    roadmap() {
      return this.nextColor === "#212121" ? [] : ["roadmap"];
    },
  },
};
</script>

<style scoped>
.bg-gray {
  background-color: #ececec;
}

.roadmap {
  background-image: url("/hor-road.png");
  background-position: left center;
  background-repeat: repeat-x;
}
</style>
