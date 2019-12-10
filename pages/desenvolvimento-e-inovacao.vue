<template>
  <v-app>
    <Description
      propsTitle="Desenvolvimento e Inovação"
      propsDescription="Laboratórios, organizações e programas que atuam com desenvolvimento & inovação."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSc-OmhsvBSUDBvx6uR6cvI6zq01M-_7JqdX4ktcB9mLE3oWzw/viewform"
    />

    <v-container>
      <v-tabs class="mt-8" grow fixed>
        <v-tab>{{tabs.tab1.name}}</v-tab>
        <v-tab>{{tabs.tab2.name}}</v-tab>
        <v-tab>{{tabs.tab3.name}}</v-tab>
        <v-tab>{{tabs.tab4.name}}</v-tab>

        <v-tab-item>
          <v-container>
            <Tab :propsID="tabs.tab1.workSheetID" />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <Tab :propsID="tabs.tab2.workSheetID" />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <Tab :propsID="tabs.tab3.workSheetID" />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <Tab :propsID="tabs.tab4.workSheetID" />
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-app>
</template>

<script>
import Tab from "../components/Tab.vue";
import Description from "../components/Description.vue";

export default {
  components: {
    Tab,
    Description
  },
  data: () => ({
    tabs: {
      tab1: {
        name: "INCT",
        workSheetID: "od6"
      },
      tab2: {
        name: "CEPID",
        workSheetID: "ocum0f9"
      },
      tab3: {
        name: "EMBRAPII",
        workSheetID: "omymu3b"
      },
      tab4: {
        name: "Centrais Multiusuário",
        workSheetID: "owgefr6"
      }
    }
  })
};
</script>
