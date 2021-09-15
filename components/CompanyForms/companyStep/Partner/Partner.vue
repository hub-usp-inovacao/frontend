<template>
  <v-container>
    <h1 class="text-h4 mt-8 mb-8">Sócios</h1>
    <PartnerList :partners="partners" @remove="removePartner" />

    <NewPartnerModal
      v-model="dialog"
      @save="includePartner"
      @close="dialog = false"
    />
  </v-container>
</template>

<script>
import PartnerList from "@/components/CompanyForms/companyStep/Partner/PartnerList.vue";
import NewPartnerModal from "@/components/CompanyForms/companyStep/Partner/NewPartnerModal.vue";

export default {
  components: { PartnerList, NewPartnerModal },
  data: () => ({
    dialog: false,
    partners: [],
  }),
  methods: {
    includePartner(partner) {
      this.partners.push(partner);
    },
    removePartner(index) {
      const end = this.partners.length;
      const head = this.partners.slice(0, index);
      const tail = this.partners.slice(index + 1, end);
      this.partners = head.concat(tail);
    },
  },
};
</script>
