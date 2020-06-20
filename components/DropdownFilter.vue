<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p class="font-weight-medium">Filtros:</p>
      </v-col>
    </v-row>

    <v-row class="hidden-sm-and-down">
      <v-col v-for="({ label, items }, i) of groups" :key="i" :cols="colSize">
        <v-select outlined :label="label" :items="items"></v-select>
      </v-col>
    </v-row>

    <v-row class="hidden-md-and-up" v-for="({ label, items }, i ) of groups" :key="i">
      <v-col cols="12">
        <v-select outlined :label="label" :items="items"></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    groups: {
      validator(value) {
        return (
          value instanceof Array &&
          value.reduce(
            (acc, el) =>
              acc && el.label && el.items && el.items.length !== undefined,
            true
          )
        );
      }
    }
  },
  computed: {
    colSize() {
      const nGroups = this.groups.length;

      return nGroups > 4 ? Math.floor(12 / nGroups) : 3;
    }
  }
};
</script>