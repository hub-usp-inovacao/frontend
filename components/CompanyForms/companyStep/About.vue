<template>
  <v-form>
    <h2 class="text-h4">Comunicação</h2>
    <LongTextInput v-model="description" label="Breve Descrição" clearable />
    <URLInput v-model="site" label="Site" />
    <ImageUploader label="Logo" @input="file = $event" />

    <MultipleInputs
      title="Tecnologias"
      input-label="Tecnologia"
      @items="technologies = $event"
    />

    <MultipleInputs
      title="Produtos/Serviços"
      input-label="Produto/Serviço"
      @items="productsAndServices = $event"
    />
  </v-form>
</template>

<script>
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue";
import LongTextInput from "@/components/CompanyForms/inputs/LongTextInput.vue";
import ImageUploader from "@/components/CompanyForms/inputs/ImageUploader.vue";
import URLInput from "@/components/CompanyForms/inputs/URLInput.vue";

export default {
  components: {
    MultipleInputs,
    LongTextInput,
    ImageUploader,
    URLInput,
  },
  data: () => ({
    description: "",
    technologies: [],
    productsAndServices: [],
    site: "",
    file: undefined,
  }),
};
</script>
