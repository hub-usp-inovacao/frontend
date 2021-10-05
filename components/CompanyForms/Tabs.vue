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

export default {
  components: {
    Base,
    About,
    Staff,
  },
  data: () => ({
    tab: null,
    items: [
      { tab: "Base", content: Base },
      { tab: "Sobre", content: About },
      { tab: "Staff", content: Staff },
    ],
  }),
};
</script>

<style>
.tab-container {
  border: 1px solid rgba(0, 0, 0, 0.4);
  padding: 0;
}
</style>
