<template>
  <v-form>
    <h2 class="text-h4">Comunicação</h2>
    <LongTextInput v-model="description" label="Breve Descrição" clearable />
    <URLInput label="Site" v-model="site" />
    <ImageUploader label="Logo" @input="file = $event" />

    <h2 class="text-h4 mt-8">Tecnologias</h2>
    <div>
      <v-row v-for="i in counter" :key="i" align="center">
          <v-col cols="10">
            <ShortTextInput
              v-model="technologies[i - 1]"
              clearable
              :label="displayLabel(i)"
            />
          </v-col>
          <v-col cols="2" align="center">
            <v-btn @click="removeTechnology(i)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        
      </v-row>
      <v-btn color="primary" @click="newTechnology" rounded>Adicionar tecnologia</v-btn>
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
    site: "",
    file: undefined,
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
