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
import { mapGetters, mapActions } from "vuex";
import PartnerList from "@/components/CompanyForms/partnersStep/PartnerList.vue";
import NewPartnerModal from "@/components/CompanyForms/partnersStep/NewPartnerModal.vue";

export default {
  components: { PartnerList, NewPartnerModal },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      partners: "company_forms/partners",
    }),
  },
  methods: {
    ...mapActions({
      setPartners: "company_forms/setPartners",
    }),
    includePartner(partner) {
      this.setPartners([...this.partners, partner]);
    },
    removePartner(index) {
      const end = this.partners.length;
      const head = this.partners.slice(0, index);
      const tail = this.partners.slice(index + 1, end);
      this.setPartners(head.concat(tail));
    },
  },
};
</script>
