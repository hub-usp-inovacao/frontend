<template>
  <v-container>
    <v-form>
      <div class="mt-5 text-h6 font-weight-regular">
        Comunicação
        <v-divider />
        <v-container>
          <LongTextInput
            v-model="description"
            label="Insira uma breve descrição da empresa"
            clearable
            hint="Descreva seu negócio, levando em consideração qual tipo de solução a mesma traz para o mercado. Busque deixar claro o posicionamento da mesma no mercado. Essa informação será divulgada."
          />
          <URLInput
            v-model="site"
            label="Site"
            hint="Se não possuir, responda N/D."
          />
          <ImageUploader
            v-model="file"
            label="Logo"
            hint="O arquivo deve possuir: boa resolução, 180 pixels (3,81 cm) x 180 pixels (3,81 cm) e estar no formato JPG ou PNG. A logomarca será exposta em um fundo branco, dessa forma, optar por uma peça que se adeque a esta configuração."
          />

          <div class="mt-5 text-h6 font-weight-regular">
            Tecnologias
            <v-divider />
            <v-container>
              <MultipleInputs
                input-label="Tecnologia"
                @items="technologies = $event"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            Produtos/serviços
            <v-divider />
            <v-container>
              <MultipleInputs
                input-label="Produto/Serviço"
                @items="productsAndServices = $event"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            Redes sociais
            <v-divider />
            <v-container>
              <MultipleInputs
                input-label="Rede social"
                component="URLInput"
                @items="socialMedias = $event"
              />
            </v-container>
          </div>
        </v-container>
      </div>
    </v-form>
  </v-container>
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
    socialMedias: [],
    site: "",
    file: undefined,
  }),
};
</script>
