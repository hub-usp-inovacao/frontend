<template>
  <div>
    <div class="hidden-sm-and-down">
      <ListAndDetails :items="items">
        <template #content="{ item }">
          <v-container>
            <v-row>
              <v-col>
                <slot name="title" :item="item"></slot>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <slot name="detailsText" :item="item"></slot>
              </v-col>
              <v-col cols="5" offset="1">
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
      <SelectAndCard :items="items" group_name="Playground">
        <template #item="{ item }">
          <v-container>
            <v-row>
              <v-col><slot name="title" :item="item"></slot></v-col>
            </v-row>
            <v-row>
              <v-col><slot name="detailsImg" :item="item"></slot></v-col>
            </v-row>
            <v-row>
              <v-col><slot name="detailsText" :item="item"></slot></v-col>
            </v-row>
            <v-row>
              <v-col><slot name="content" :item="item"></slot></v-col>
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
import ListAndDetails from '@/components/first_level/ListAndDetails.vue';
import SelectAndCard from '@/components/first_level/SelectAndCard.vue';

export default {
  components: {
    SelectAndCard,
    ListAndDetails
  },
  props: ['items']
}
</script>
