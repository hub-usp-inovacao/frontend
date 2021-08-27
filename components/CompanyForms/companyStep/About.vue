<template>
  <v-form>
    <LongTextInput v-model="description" label="Breve Descrição" clearable />
    <div>
      <div v-for="i in counter" :key="i">
        <ShortTextInput
          v-model="technologies[i - 1]"
          clearable
          :label="displayLabel(i)"
        />
        <v-btn @click="removeTechnology(i)">Remover</v-btn>
      </div>
      <v-btn @click="newTechnology">Adicionar tecnologia</v-btn>
    </div>
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
    description: "",
    technologies: [],
    counter: 0,
  }),

  methods: {
    displayLabel(i) {
      return `Tecnologia ${i}`;
    },

    newTechnology() {
      this.counter++;
      this.technologies.push("");
    },

    removeTechnology(i) {
      const end = this.technologies.length;
      const head = this.technologies.slice(0, i - 1);
      const tail = this.technologies.slice(i, end);

      this.technologies = head.concat(tail);
      this.counter--;
    },
  },
};
</script>
