<template>
  <v-item-group mandatory>
    <v-container>
      <v-row justify="center" class="ma-0">
        <v-col v-for="(item,i) in tabs" :key="item.name">
          <v-item>
            <v-card
              :color="tab === i ? '#003836' : '#005C59'"
              @click="updateTab(i)"
              :raised="tab === i"
              height="100%"
            >
              <v-card-title style="justify-content: center;">
                <p class="title white--text font-weight-bold mb-0">{{item.name}}</p>
              </v-card-title>
              <v-card-text>
                <p class="caption white--text font-wight-light mb-0">{{item.description}}</p>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
export default {
  data: () => ({
    tab: 0
  }),
  methods: {
    updateTab(i) {
      this.tab = i;
    }
  },
  props: ["tabs"],
  watch: {
    tab(t) {
      this.$emit("tab", t);
    }
  }
};
</script>