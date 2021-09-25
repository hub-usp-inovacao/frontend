<template>
  <v-container>
    <v-stepper v-model="e1" alt-labels>
      <v-stepper-header>
        <template v-for="number in numberOfSteps">
          <v-stepper-step
            :key="`header_${number}`"
            :complete="isStepCompleted(number)"
            :step="number"
            color="success"
          ></v-stepper-step>

          <v-divider
            v-if="number < numberOfSteps"
            :key="`divider_${number}`"
          ></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content
          v-for="({ id, component }, index) in steps"
          :key="id"
          :step="id"
        >
          <component :is="component" class="component-border mb-12"></component>

          <v-row class="mr-4" justify="end">
            <v-btn
              class="mr-4"
              color="secondary"
              :disabled="!index"
              @click="previousStep(id)"
              >Voltar</v-btn
            >
            <v-btn color="secondary" @click="nextStep(id)">
              {{ nextStepBtnText(id) }}
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import PartnerSection from "@/components/CompanyForms/companyStep/PartnerSection/PartnerSection.vue";

export default {
  components: {
    PartnerSection,
  },
  data: () => ({
    e1: 1,
    steps: [
      { id: 1, component: PartnerSection },
      { id: 2, component: PartnerSection },
      { id: 3, component: PartnerSection },
      { id: 4, component: PartnerSection },
    ],
  }),
  computed: {
    numberOfSteps() {
      return this.steps.length;
    },
  },
  methods: {
    nextStepBtnText(id) {
      const length = this.numberOfSteps;
      const lastId = this.steps[length - 1].id;
      return id < lastId ? "Seguir" : "Finalizar";
    },
    isStepCompleted(number) {
      return this.e1 > number;
    },
    previousStep(id) {
      const firstId = this.steps[0].id;

      if (id > firstId) {
        this.e1 = id - 1;
      }
    },
    nextStep(id) {
      const length = this.numberOfSteps;
      const lastId = this.steps[length - 1].id;

      if (id < lastId) {
        this.e1 = id + 1;
      }
    },
  },
};
</script>

<style scoped>
.component-border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
