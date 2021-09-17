<template>
  <v-row justify="center">
    <v-dialog
      :value="value"
      persistent
      max-width="600px"
      @input="$emit('input', $event)"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mt-8 mb-8" color="primary" dark v-bind="attrs" v-on="on">
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
          <v-btn color="primary darken-1" text @click="closeDialog">
            Fechar
          </v-btn>
          <v-btn color="primary darken-1" text @click="savePartnerPipeline">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: { ShortTextInput, Dropdown },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: () => false,
    },
  },
  data: () => ({
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
      this.save();
      this.clearFormDataInputs();
      this.closeDialog();
    },
    save() {
      this.$emit("save", Object.assign({}, this.formData));
    },
    clearFormDataInputs() {
      Object.keys(this.formData).forEach((key) => (this.formData[key] = ""));
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
