<template>
  <v-item-group mandatory>
    <v-container>
      <v-row justify="center" class="ma-0">
        <template v-for="(item,i) in tabs">
          <v-col :key="item.name">
            <v-item>
              <v-card
                :color="tab === i ? active : color"
                @click="updateTab(i)"
                :raised="tab === i"
                height="100%"
              >
                <slot name="card" :item="item">
                  <v-card-title class="justify-center">
                    <p class="title white--text font-weight-bold text-center mb-0">{{item.name}}</p>
                  </v-card-title>

                  <v-card-text v-if="item.description">
                    <p class="caption white--text font-wight-light ma-0">{{item.description}}</p>
                  </v-card-text>
                </slot>
              </v-card>
            </v-item>
          </v-col>
          <v-responsive v-if="tabs.length > 5 && wrap(i)" :key="`width-${i}`" width="100%"></v-responsive>
        </template>
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
    },
    wrap(i) {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return (i + 1) % 2 == 0;
        case "sm":
          return (i + 1) % 3 == 0;
        case "md":
          return (i + 1) % 4 == 0;
        default:
          return (i + 1) % 5 == 0;
      }
    }
  },
  props: ["tabs", "color", "active"],
  watch: {
    tab(t) {
      this.$emit("tab", t);
    }
  }
};
</script>
