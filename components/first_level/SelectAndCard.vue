<template>
  <v-row justify="center" class="ma-0">
    <v-col cols="11" sm="10">
      <v-card>
        <v-container>
          <v-select
            flat
            rounded
            filled
            hide-details
            v-model="current_item"
            menu-props="auto"
            color="#37474F"
            :items="items.map((item,i) => ({text: item.name, value: i}))"
            no-data-text="Não encontramos nada"
            label="Escolha uma disciplina"
          >
            <template v-slot:selection="{ item, index }">
              <slot name="selection" :item="item" :index="index"></slot>
            </template>
          </v-select>
        </v-container>

        <div v-if="current_item >= 0">
          <slot name="item" :item="item">
            <v-container px-6>
              <p class="title">{{item.name}}</p>
              <p class="body-2 font-italic my-2">{{item.category}}</p>
              <p class="body-2">{{item.campus}} - {{item.unity}}</p>
            </v-container>

            <v-container px-6>
              <p class="body-2">{{item.description.long}}</p>
            </v-container>

            <v-card-actions>
              <v-spacer />
              <v-btn depressed dark color="rgb(255, 167, 38)" :href="item.url">Saiba mais</v-btn>
              <v-spacer />
            </v-card-actions>
          </slot>
        </div>
      </v-card>
    </v-col>
  </v-row>
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