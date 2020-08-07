<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <List :items="items" v-model="selectedItem" />
      </v-col>
      <v-col cols="7">
        <DetailsCard :item="selectedItem">
          <template v-slot:itemTitle>
            <slot name="itemTitle" v-bind:item="selectedItem"></slot>
          </template>
          <template v-slot:content>
            <slot name="content" v-bind:item="selectedItem"></slot>
          </template>
          <template v-slot:buttons>
            <slot name="buttons" v-bind:item="selectedItem"></slot>
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
  props: ["items"],
  data: () => ({
    selectedItem: null,
  }),
};
</script>