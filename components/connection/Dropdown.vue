<template>
  <v-row>
    <v-col>
      <v-select
        :items="options"
        :value="value"
        :label="label"
        clearable
        :disabled="disabled"
        :multiple="multipleOption"
        @input="$emit('input', $event)"
      />
      <table>
        <tr>
          <th>Porte</th>
          <th>Indústria de Transformação</th>
          <th>Outros</th>
        </tr>
        <tr>
          <td>Microempresas</td>
          <td>&le; 19 pessoas</td>
          <td>&le; 9 pessoas</td>
        </tr>
        <tr>
          <td>Pequena Empresa</td>
          <td>de 20 a 99 pessoas</td>
          <td>de 10 a 49 pessoas</td>
        </tr>
        <tr>
          <td>Média Empresa</td>
          <td>de 100 a 499 pessoas</td>
          <td>de 50 a 99 pessoas</td>
        </tr>
        <tr>
          <td>Grande Empresa</td>
          <td>&ge; 500 pessoas</td>
          <td>&ge; 100 pessoas</td>
        </tr>
      </table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    multipleOption: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      required: true,
    },
    value: {
      required: false,
    },
    label: {
      type: String,
      default: "",
    },
    lastUpdated: {
      type: String,
      default: undefined,
    },
  },
};
</script>

<style scoped>
table {
  text-align: center;
}
th,
td {
  padding: 10px;
}
</style>
