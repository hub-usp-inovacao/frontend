<template>
  <v-container class="tab-container">
    <v-tabs v-model="tab" fixed-tabs>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <component :is="item.content"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Base from "@/components/CompanyForms/companyStep/Base.vue";
import About from "@/components/CompanyForms/companyStep/About.vue";
import Staff from "@/components/CompanyForms/companyStep/Staff.vue";
import Incubator from "@/components/CompanyForms/companyStep/Incubator.vue";
import Finance from "@/components/CompanyForms/companyStep/Finance.vue";

export default {
  components: {
    Base,
    About,
    Staff,
    Finance,
  },
  data: () => ({
    tab: null,
    items: [
      { tab: "Dados da empresa", content: Base },
      { tab: "Sobre a empresa", content: About },
      { tab: "Incubação", content: Incubator },
      { tab: "Colaboradores", content: Staff },
      { tab: "Investimentos", content: Finance },
    ],
  }),
};
</script>

<style>
.tab-container {
  padding: 0;
}
</style>
