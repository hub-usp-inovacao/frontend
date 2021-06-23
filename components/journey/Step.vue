<template>
  <main>
    <v-container class="hidden-sm-and-down">
      <v-row>
        <v-col>
          {{ title }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-row>
            <v-col>{{ description }}</v-col>
          </v-row>
          <v-row>
            <v-col>{{ previous }} {{ next }}</v-col>
          </v-row>
        </v-col>
        <v-col>
          <slot></slot>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="hidden-md-and-up">
      <div class="d-flex flex-column">
        <section>{{ title }}</section>
        <section>{{ description }}</section>
        <section><slot></slot></section>
        <section>{{ previous }} {{ next }}</section>
      </div>
    </v-container>
  </main>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    next: {
      type: String,
      required: true,
    },
    previous: {
      type: String,
      required: true,
    },
  },
};
</script>
