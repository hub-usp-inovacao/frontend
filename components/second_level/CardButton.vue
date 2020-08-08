<template>
  <v-item-group mandatory>
    <v-container>
      <v-row justify="center">
        <template v-for="(item,i) in tabs">
          <v-col class="px-1 py-1" :cols="row_length < 6 ? 12 / row_length : ''" :key="item.name">
            <v-item>
              <v-card
                :color="selected.includes(item.name) ? active : color"
                @click="toggleTab(item.name)"
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
    selected: []
  }),
  computed: {
    row_length: function() {
      let length;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          length = 2;
          break;
        case "sm":
          length = 2;
          break;
        case "md":
          length = 4;
          break;
        default:
          length = 6;
          break;
      }

      if (this.tabs.length > length) {
        let rows = Math.ceil(this.tabs.length / length);
        length = Math.ceil(this.tabs.length / rows);
      }

      return length;
    }
  },
  methods: {
    toggleTab(tab) {
      const i = this.selected.findIndex(el => el === tab);

      if (i === -1) {
        this.selected.push(tab);
      } else {
        this.selected = this.selected.filter((el, index) => index !== i);
      }
    },
    wrap(i) {
      return (i + 1) % this.row_length == 0;
    }
  },
  props: ["tabs", "color", "active"],
  watch: {
    selected(newList) {
      this.$emit("select", newList);
    }
  }
};
</script>
