<template>
  <section>
    <div class="background">
      <Panel :title="title" :description="description" no-search />
    </div>

    <v-form>
      <v-container>
        <v-row>
          <v-col sm="10" offset-sm="1" cols="8" offset="2">
            <v-text-field v-model="update.cnpj" label="CNPJ da Empresa:" />
          </v-col>
        </v-row>

        <v-row v-for="(field, i) of update.new_values" :key="i">
          <v-col cols="5" sm="4">
            <v-text-field v-model="field.attribute" label="Nome do Campo" />
          </v-col>
          <v-col cols="5" offset="1" sm="4" offset-sm="1">
            <v-text-field v-model="field.value" label="Novo valor do Campo" />
          </v-col>
          <v-col cols="1" sm="2">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="removeField(field)"
            >
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="2" offset="3" class="text-center">
            <v-btn color="primary" width="100" text @click="addField">
              Novo Campo
            </v-btn>
          </v-col>
          <v-col cols="2" offset="1" class="text-center">
            <v-btn
              color="secondary"
              width="100"
              text
              :loading="loading"
              @click="submit"
            >
              Enviar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </section>
</template>

<script>
import Panel from "@/components/first_level/Panel.vue";

export default {
  components: {
    Panel,
  },
  data: () => ({
    title: "Atualização de Empresas",
    description:
      "Representantes das Empresas podem solicitar, nesta página, a atualização dos dados cadastrados",

    loading: false,

    update: {
      cnpj: "",
      new_values: [{ attribute: "", value: "" }],
    },
  }),

  computed: {
    updatingFields() {
      return this.update.new_values.length;
    },
  },

  methods: {
    addField() {
      this.update.new_values.push({ attribute: "", value: "" });
    },
    removeField({ attribute, value }) {
      this.update.new_values = this.update.new_values.filter(
        (one) => one.attribute !== attribute && one.value !== value
      );
    },
    async submit() {
      this.loading = true;

      const url = process.env.BACKEND_URL + "/companies";
      const opts = { method: "PATCH" };

      try {
        const resp = await fetch(url, opts);
        console.log(resp);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
