<template>
  <v-form>
    <LongTextInput label="Breve Descrição" v-model="description" clearable />
  </v-form>
</template>

<script>
import ShortTextInput from "@/components/CompanyForms/inputs/ShortTextInput.vue";
import LongTextInput from "@/components/CompanyForms/inputs/LongTextInput.vue";
import ImageUploader from "@/components/CompanyForms/inputs/ImageUploader.vue";
import URLInput from "@/components/CompanyForms/inputs/URLInput.vue";

export default {
  components: {
    ShortTextInput,
    LongTextInput,
    ImageUploader, 
    URLInput,
  },
  data: () => ({
    description: '',
  }),
};
</script>
