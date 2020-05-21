<template>
  <v-card height="35rem" class="d-flex flex-column" :class="{'justify-center': items.length == 0}">
    <div v-if="items.length > 0">
      <div class="d-flex justify-center">
        <v-icon large>keyboard_arrow_up</v-icon>
      </div>

      <v-list rounded height="30rem" max-height="100%" style="overflow-y: auto;">
        <v-list-item-group v-model="selectedItem">
          <v-list-item v-for="i in items" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="i" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <div class="d-flex justify-center">
        <v-icon large>keyboard_arrow_down</v-icon>
      </div>
    </div>
    <div v-else>
      <v-container>
        <v-row class="fill-height ma-0" justify="center" align="center">
          <p
            class="title font-weight-light text-center mb-0"
          >Não encontramos nada relacionado à sua pesquisa</p>
        </v-row>
      </v-container>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["items"],
  data: () => ({
    selectedItem: ""
  }),
  watch: {
    selectedItem() {
      const i = this.selectedItem;
      this.$emit("selected", this.items[i]);
    }
  }
};
</script>

<style>
</style>