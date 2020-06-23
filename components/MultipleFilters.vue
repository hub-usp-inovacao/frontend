<template>
  <v-container>
    <v-row>
      <v-col>
        <CardButton
          :tabs="tabs"
          :color="colors.base"
          :active="colors.active"
          @select="selectedTabs = $event"
        />
      </v-col>
    </v-row>
    <v-row v-if="needSubfilters">
      <v-col>
        <ChipSubfilter
          :subareas="availableSubareas"
          @subfilter-change="selectedSubfilters = $event"
        />
      </v-col>
    </v-row>
    <v-row v-if="needDropdown">
      <v-col>
        <DropdownFilter :groups="groups" @select="selectedDropdownFilters = $event" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardButton from "@/components/CardButton.vue";
import ChipSubfilter from "@/components/ChipSubfilter.vue";
import DropdownFilter from "@/components/DropdownFilter.vue";

export default {
  components: {
    CardButton,
    ChipSubfilter,
    DropdownFilter
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    tabs: {
      validator(givenTabs) {
        return (
          givenTabs instanceof Array &&
          givenTabs.reduce((acc, tab) => {
            const tabKeys = Object.keys(tab);

            return (
              acc &&
              tabKeys.includes("name") &&
              tabKeys.includes("subareas") &&
              tab.subareas instanceof Array &&
              tab.subareas.reduce(
                (acc, sa) => acc && typeof sa === "string",
                true
              )
            );
          }, true)
        );
      }
    },
    groups: {
      validator(givenGroups) {
        return (
          givenGroups instanceof Array &&
          givenGroups.reduce(
            (acc, { label, items }) =>
              label &&
              typeof label === "string" &&
              items instanceof Array &&
              items.every(item => typeof item === "string"),
            true
          )
        );
      }
    },
    filterFun: {
      type: Function,
      required: true
    },
    colors: {
      validator(colors) {
        const { base, active } = colors;
        return (
          base !== undefined &&
          typeof base === "string" &&
          active !== undefined &&
          typeof active === "string"
        );
      }
    }
  },
  data: () => ({
    selectedTabs: [],
    selectedSubfilters: [],
    selectedDropdownFilters: []
  }),
  computed: {
    availableSubareas() {
      return this.tabs
        .filter(({ name }) => this.selectedTabs.includes(name))
        .reduce((acc, { subareas }) => acc.concat(subareas), []);
    },
    needSubfilters() {
      return this.tabs.some(tab => tab.subareas !== undefined);
    },
    needDropdown() {
      return this.groups !== undefined;
    },
    filteredItems() {
      const current = {
        primary: this.selectedTabs,
        secondary: this.selectedSubfilters,
        terciary: this.selectedDropdownFilters
      };

      return this.items.filter(item => this.filterFun(item, current));
    }
  },
  watch: {
    filteredItems(items) {
      this.$emit("filtered", items);
    }
  }
};
</script>