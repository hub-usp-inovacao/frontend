<template>
  <div id="display-data">
    <div class="hidden-sm-and-down">
      <ListAndDetails
        :items="items"
        :selected="selectedItem"
        @input="selectedItem = $event"
      >
        <template #itemTitle="{ item }">
          <slot name="title" :item="item"></slot>
        </template>
        <template #content="{ item }">
          <v-container :class="containerClass">
            <v-row>
              <v-col :cols="11 - imageColumn">
                <slot name="detailsText" :item="item"></slot>
              </v-col>
              <v-col :cols="imageColumn" offset="1">
                <slot name="detailsImg" :item="item"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <slot name="content" :item="item"></slot>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template #buttons="{ item }">
          <slot name="actions" :item="item"></slot>
        </template>
      </ListAndDetails>
    </div>
    <div class="hidden-md-and-up">
      <SelectAndCard
        :items="items"
        :group-name="groupName"
        :selected="selectedItem"
      >
        <template #item="{ item }">
          <v-container>
            <v-row>
              <v-col>
                <slot name="title" :item="item"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <slot name="detailsImg" :item="item"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <slot name="detailsText" :item="item"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <slot name="content" :item="item"></slot>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template #buttons="{ item }">
          <v-container>
            <v-row justify="center">
              <slot name="actions" :item="item"></slot>
            </v-row>
          </v-container>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import ListAndDetails from "@/components/second_level/ListAndDetails.vue";
import SelectAndCard from "@/components/second_level/SelectAndCard.vue";

export default {
  components: {
    SelectAndCard,
    ListAndDetails,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    reverse: {
      type: Boolean,
      default: () => false,
    },
    selected: {
      type: Object,
      default: undefined,
    },
    hasImage: {
      type: Boolean,
      default: () => true,
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
    containerClass() {
      return this.reverse && ["d-flex", "flex-column-reverse"];
    },
    imageColumn() {
      return this.hasImage ? 5 : 0;
    },
  },
  watch: {
    selectedItem() {
      this.$emit("input", this.selectedItem);
    },
  },
};
</script>
