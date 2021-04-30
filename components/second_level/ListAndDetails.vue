<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <List
          v-model="selectedItem"
          :items="items"
          @input="selectedItem = $event"
        />
      </v-col>
      <v-col cols="7">
        <DetailsCard :item="selectedItem">
          <template v-slot:itemTitle>
            <slot name="itemTitle" :item="selectedItem"></slot>
          </template>
          <template v-slot:content>
            <slot name="content" :item="selectedItem"></slot>
          </template>
          <template v-slot:buttons>
            <slot name="buttons" :item="selectedItem"></slot>
          </template>
        </DetailsCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import List from "@/components/deeper_levels/List.vue";
import DetailsCard from "@/components/deeper_levels/DetailsCard.vue";

export default {
  components: {
    List,
    DetailsCard,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: Object,
      default: undefined,
    },
  },
  data: () => ({
    item: undefined,
  }),
  computed: {
    selectedItem: {
      get() {
        return this.item !== undefined ? this.item : this.selected;
      },
      set(newValue) {
        this.item = newValue;
      },
    },
  },
  watch: {
    selectedItem() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
