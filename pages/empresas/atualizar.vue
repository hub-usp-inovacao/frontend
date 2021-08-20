<template>
  <section>
    <div class="background">
      <Panel :title="title" :description="description" no-search />
    </div>

    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="update.cnpj"
              label="CNPJ da Empresa:"
              :rules="rules.cnpj"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="update.name"
              label="Seu nome:"
              :rules="rules.name"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="update.email"
              label="Seu email:"
              :rules="rules.email"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="10">
            <v-text-field
              v-model="update.phone"
              label="Telefone de contato:"
              :rules="rules.phone"
            />
          </v-col>
        </v-row>

        <v-row v-for="(field, i) of update.new_values" :key="i">
          <v-col cols="8" class="d-flex flex-column flex-md-row">
            <v-select
              v-model="field.attribute"
              class="mr-md-4"
              label="Campo"
              :items="validFields"
              :rules="rules.name"
            />

            <v-text-field
              v-if="ithFieldSelected(i) && ithField(i) !== 'Área'"
              v-model="field.value"
              label="Novo valor do Campo"
              :rules="rules.value"
            />

            <div v-else-if="ithFieldSelected(i)">
              <v-select
                label="Primária"
                :items="cnaeMajors"
                :rules="rules.value"
                @input="setIthMajor(i, $event)"
              />
              <v-select
                label="Secundária"
                :items="cnaeMinors(ithMajor(i))"
                no-data-text="Selecione uma área primária antes"
                :rules="rules.value"
                @input="setIthMinor(i, $event)"
              />
            </div>
          </v-col>
          <v-col cols="1" offset="1">
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="removeField(i)"
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
              :disabled="!formValid"
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

    validFields: [
      "Ano",
      "Área",
      "Descrição",
      "Ecossistema",
      "Emails",
      "Endereço",
      "Nome",
      "Porte",
      "Serviços",
      "Site",
      "Tecnologias",
      "Telefones",
    ],

    update: {
      cnpj: "",
      name: "",
      email: "",
      phone: "",
      new_values: [{ attribute: "", value: "" }],
    },

    rules: {
      cnpj: [
        (f) =>
          /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(f) || "Formato inválido",
      ],

      name: [
        (f) => /^[\wãâáàêéèíìõôóòúùçñ\-. ]+$/i.test(f) || "Formato inválido",
      ],

      value: [(f) => (f || "").length > 0 || "Valor inválido"],

      phone: [
        (f) =>
          /^[\d()+]{8,16}$/.test(f.replaceAll(" ", "")) || "Formato inválido",
      ],

      email: [(f) => /^\w+@\w+\.\w+/.test(f) || "Formato inválido"],
    },
  }),

  computed: {
    cnaeMajors() {
      return Object.keys(this.$reverseCNAE);
    },
    formValid() {
      return this.update.new_values.length > 0;
    },
  },

  methods: {
    setIthMajor(i, e) {
      this.update.new_values[i].value = { major: e };
    },
    setIthMinor(i, e) {
      this.update.new_values[i].value.minor = e;
    },
    ithMajor(i) {
      return this.update.new_values[i].value.major;
    },
    cnaeMinors(major) {
      if (!major) return undefined;
      return this.$reverseCNAE[major].map(({ minor }) => minor);
    },
    ithField(i) {
      return this.update.new_values[i].attribute;
    },
    ithFieldSelected(i) {
      return this.ithField(i).length > 0;
    },
    addField() {
      this.update.new_values.push({ attribute: "", value: "" });
    },
    removeField(i) {
      this.update.new_values = this.update.new_values.filter(
        (_, index) => index !== i
      );
    },
    runValidation() {
      return this.formValid && this.$refs.form.validate();
    },
    async submit() {
      this.loading = true;

      if (this.runValidation()) {
        const newValues = this.update.new_values.map(({ attribute, value }) => {
          const o = {};
          o[attribute] = value;
          return o;
        });

        const company = { ...this.update, new_values: newValues };

        try {
          await this.$axios.$patch("/companies", { company });
          this.update = {
            cnpj: "",
            name: "",
            email: "",
            phone: "",
            new_values: [{ attribute: "", value: "" }],
          };

          alert(
            "Solicitação enviada com sucesso! Em breve seus dados serão atualizados."
          );
        } catch (e) {
          console.log(e);
        }
      }

      this.loading = false;
    },
  },
};
</script>
