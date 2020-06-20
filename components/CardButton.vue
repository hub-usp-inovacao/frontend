<template>
  <v-item-group mandatory>
    <v-container>
      <v-row justify="center" class="ma-0">
        <template v-for="(item,i) in tabs">
          <v-col :cols="row_length < 6 ? 12 / row_length : ''" :key="item.name">
            <v-item>
              <v-card
                :color="tab === i ? active : color"
                @click="updateTab(i)"
                :raised="tab === i"
                height="100%"
                min-height="100px"
              >
                <v-container fill-height>
                  <v-row class="align-center justify-center ma-0">
                    <p
                      class="white--text subtitle-1 font-weight-medium text-center mb-0"
                    >{{item.name}}</p>
                  </v-row>
                </v-container>
              </v-card>
            </v-item>
          </v-col>
          <v-responsive v-if="tabs.length > 6 && wrap(i)" :key="`width-${i}`" width="100%"></v-responsive>
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
  computed: {
    row_length: function() {
      let length;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          length = 2;
        case "sm":
          length = 3;
        case "md":
          length = 4;
        default:
          length = 6;
      }

      if (this.tabs.length > length) {
        let rows = Math.ceil(this.tabs.length / length);
        length = Math.ceil(this.tabs.length / rows);
      }

      return length;
    }
  },
  methods: {
    updateTab(i) {
      this.tab = i;
    },
    wrap(i) {
      return (i + 1) % this.row_length == 0;
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
