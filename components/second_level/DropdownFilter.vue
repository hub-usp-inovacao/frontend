<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="font-weight-medium">Filtros:</p>
      </v-col>
    </v-row>

    <v-row class="hidden-sm-and-down">
      <v-col v-for="({ label, items }, i) of groups" :key="i" :cols="colSize">
        <v-autocomplete
          v-model="selected[i]"
          :no-data-text="noData"
          menu-props="auto"
          :label="label"
          :items="items"
          clearable
          :filter="customFilter"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row
      v-for="({ label, items }, i) of groups"
      :key="i"
      class="hidden-md-and-up"
    >
      <v-col cols="12">
        <v-select
          v-model="selected[i]"
          :no-data-text="noData"
          menu-props="auto"
          :label="label"
          :items="items"
          clearable
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { removeAccent } from "@/lib/format";

export default {
  props: {
    groups: {
      type: Array,
      required: true,
      validator(value) {
        return (
          value instanceof Array &&
          value.reduce(
            (acc, el) =>
              acc && el.label && el.items && el.items.length !== undefined,
            true
          )
        );
      },
    },
  },
  data: () => ({
    selected: [],
    noData: "Indisponível",
  }),
  computed: {
    ...mapGetters({
      isEmpty: "competencia/isEmpty",
    }),
    colSize() {
      const nGroups = this.groups.length;

      return nGroups > 4 ? Math.floor(12 / nGroups) : 3;
    },
  },
  watch: {
    isEmpty() {
      if (!this.isEmpty) {
        this.$emit("select", this.selected);
      }
    },
    selected(list) {
      console.log(list);
      this.$emit("select", list);
    },
  },
  beforeMount() {
    this.groups.forEach(({ preSelected }, i) => {
      if (preSelected) {
        this.selected[i] = preSelected;
      } else {
        this.selected[i] = undefined;
      }
    });

    // this.$emit("select", this.selected);
  },
  methods: {
    customFilter(_item, queryText, itemText) {
      if (itemText.indexOf(queryText) > -1) return true;

      const inspectQuery = removeAccent(queryText.toLowerCase());
      const inspectItem = removeAccent(itemText.toLowerCase());
      return inspectItem.indexOf(inspectQuery) > -1;
    },
  },
};
</script>
