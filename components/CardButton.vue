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
                  <v-container fill-height>
                    <v-row class="align-center justify-center ma-0">
                      <p
                        class="white--text subtitle-1 font-weight-medium text-center mb-0"
                      >{{item.name}}</p>
                    </v-row>
                  </v-container>
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
