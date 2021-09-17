<template>
  <div v-if="hasPartners" class="d-flex flex-wrap">
    <v-card
      v-for="(partner, index) in partners"
      :key="partner.nusp"
      class="mx-2 my-2"
    >
      <v-card-title>{{ partner.name }}</v-card-title>
      <v-card-subtitle>NUSP: {{ partner.nusp }}</v-card-subtitle>
      <v-card-text>
        Vínculo: {{ partner.bond }}<br />
        Unidade: {{ partner.unity }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darker-1" text @click="removePartner(index)"
          >Excluir</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
  <p v-else class="body-2">Não existem sócios cadastrados.</p>
</template>

<script>
export default {
  props: {
    partners: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasPartners() {
      return this.partners.length > 0;
    },
  },
  methods: {
    removePartner(index) {
      this.$emit("remove", index);
    },
  },
};
</script>
