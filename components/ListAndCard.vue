<template>
  <v-container fluid>
    <v-row justify="center" class="ma-0">
      <v-col cols="5">
        <v-card
          height="35rem"
          class="d-flex flex-column justicy-space-between"
          :class="{'justify-center' : items.length == 0}"
        >
          <div v-if="items.length > 0">
            <div class="d-flex justify-center">
              <v-icon large>keyboard_arrow_up</v-icon>
            </div>

            <div style="height: 30rem">
              <v-list rounded style="max-height: 100%; overflow-y: auto;">
                <v-list-item-group v-model="current_item">
                  <v-list-item v-for="item in items" :key="item.name">
                    <slot name="li" :item="item">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle>{{item.key_words}}</v-list-item-subtitle>
                      </v-list-item-content>
                    </slot>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>

            <div class="d-flex justify-center">
              <v-icon large>keyboard_arrow_down</v-icon>
            </div>
          </div>
          <div v-else>
            <v-container>
              <v-row class="fill-height ma-0" justify="center" align="center">
                <p
                  class="title font-weight-light text-center mb-0"
                >Não encontramos nada relacionado a sua pesquisa</p>
              </v-row>
            </v-container>
          </div>
        </v-card>
      </v-col>

      <v-col cols="5">
        <v-card height="35rem">
          <div v-if="current_item >= 0" class="fill-height" style="overflow-y: auto;">
            <slot name="item" :item="item"></slot>
          </div>
          <!-- <v-card-title px-6>
                <p class="title">{{item.name}}</p>
              </v-card-title>

              <v-card-text px-6>
                <p class="body-2 font-italic mb-0">{{item.knownledge.toString()}}</p>

                <p class="body-2 mb-10">{{item.campus}} - {{item.unity}}</p>

                <p class="body-2">{{item.description.long}}</p>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn depressed dark color="rgb(255, 167, 38)" :href="item.url">Saiba mais</v-btn>
          </v-card-actions>-->

          <div v-else class="fill-height">
            <v-row class="fill-height ma-0" justify="center" align="center">
              <p class="title font-weight-light text-center mb-0">Selecione um Item na lista ao lado</p>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    current_item: -1
  }),
  computed: {
    item: function() {
      if (this.current_item < 0) return null;
      return this.items[this.current_item];
    }
  },
  watch: {
    items(v) {
      this.current_item = -1;
    }
  },
  props: ["items"]
};
</script>