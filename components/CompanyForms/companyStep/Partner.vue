<template>
  <v-container>
    <h1 class="text-h4 mt-8 mb-8">Sócios</h1>
    <div class="d-flex flex-wrap">
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

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mt-8 mb-8"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Adicionar sócio
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Dados do novo sócio</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <ShortTextInput v-model="formData.name" label="Nome completo" />
              <ShortTextInput v-model="formData.nusp" label="NUSP" />
              <ShortTextInput v-model="formData.bond" label="Vínculo" />
              <Dropdown
                v-model="formData.unity"
                label="Unidade"
                :options="unities"
              />
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" text @click="dismissDialog">
              Fechar
            </v-btn>
            <v-btn color="primary darken-1" text @click="savePartnerPipeline">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: { ShortTextInput, Dropdown },
  data: () => ({
    dialog: false,
    partners: [],
    formData: {
      name: "",
      nusp: "",
      bond: "",
      unity: "",
    },
  }),
  computed: {
    unities() {
      return this.$campi
        .reduce((acc, { unities }) => acc.concat(unities), [])
        .sort();
    },
  },
  methods: {
    savePartnerPipeline() {
      this.includeNewPartner();
      this.clearFormDataInputs();
      this.dismissDialog();
    },
    includeNewPartner() {
      this.partners.push({
        name: this.formData.name,
        nusp: this.formData.nusp,
        bond: this.formData.bond,
        unity: this.formData.unity,
      });
    },
    clearFormDataInputs() {
      Object.keys(this.formData).forEach((key) => (this.formData[key] = ""));
    },
    dismissDialog() {
      this.dialog = false;
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
