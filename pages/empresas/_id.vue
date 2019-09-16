<template>
  <v-app>
    <div>{{id}}</div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    id: this.$route.params.id
  })
};
</script>
