<template>
  <v-container>
    <v-form>
      <div class="mt-5 text-h6 font-weight-regular">
        Comunicação
        <v-divider />
        <v-container>
          <LongTextInput
            :value="descriptionLong"
            label="Insira uma breve descrição da empresa"
            clearable
            hint="Descreva seu negócio, levando em consideração qual tipo de solução a mesma traz para o mercado. Busque deixar claro o posicionamento da mesma no mercado. Essa informação será divulgada."
            @input="setDescriptionLong"
          />
          <URLInput
            :value="url"
            label="Site"
            hint="Se não possuir, responda N/D."
            @input="setUrl"
          />
          <ImageUploader
            :value="logo"
            label="Logo"
            hint="O arquivo deve possuir: boa resolução, 180 pixels (3,81 cm) x 180 pixels (3,81 cm) e estar no formato JPG ou PNG. A logomarca será exposta em um fundo branco, dessa forma, optar por uma peça que se adeque a esta configuração."
            @input="setLogo"
          />

          <div class="mt-5 text-h6 font-weight-regular">
            Tecnologias
            <v-divider />
            <v-container>
              <MultipleInputs
                :value="technologies"
                input-label="Tecnologia"
                @input="setTechnologies"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            Produtos/serviços
            <v-divider />
            <v-container>
              <MultipleInputs
                :value="services"
                input-label="Produto/Serviço"
                @input="setServices"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            O negócio da sua empresa está relacionado a algumas das ODS?
            <v-divider />
            <v-container>
              <Dropdown
                :value="ods"
                :options="odsList"
                multiple-option
                label=""
                @input="setOds"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            Redes sociais
            <v-divider />
            <v-container>
              <MultipleInputs
                :value="socialMedias"
                input-label="Rede social"
                component="URLInput"
                @input="setSocialMedias"
              />
            </v-container>
          </div>
        </v-container>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MultipleInputs from "@/components/CompanyForms/inputs/MultipleInputs.vue";
import LongTextInput from "@/components/CompanyForms/inputs/LongTextInput.vue";
import ImageUploader from "@/components/CompanyForms/inputs/ImageUploader.vue";
import URLInput from "@/components/CompanyForms/inputs/URLInput.vue";
import Dropdown from "@/components/CompanyForms/inputs/Dropdown.vue";

export default {
  components: {
    MultipleInputs,
    LongTextInput,
    ImageUploader,
    URLInput,
    Dropdown,
  },
  data: () => ({
    odsList: [
      "1 - Erradicação da Pobreza",
      "2 - Fome Zero",
      "3 - Saúde e Bem Estar",
      "4 - Educação de Qualidade",
      "5 - Igualdade de Gênero",
      "6 - Água Potável e Saneamento",
      "7 - Energia Limpa e Acessível",
      "8 - Trabalho Decente e Crescimento Econômico",
      "9 - Indústria, Inovação e Infraestrutura",
      "10 - Redução das Desigualdades",
      "11 - Cidades e Comunidades Sustentáveis",
      "12 - Consumo e Produção Responsáveis",
      "13 - Ação Contra a Mudança Global do Clima",
      "14 - Vida na Água",
      "15 - Vida Terrestre",
      "16 - Paz, Justiça e Instituições Eficazes",
      "17 - Parcerias e Meios de Implementação",
    ],
  }),
  computed: {
    ...mapGetters({
      descriptionLong: "company_forms/descriptionLong",
      technologies: "company_forms/technologies",
      services: "company_forms/services",
      ods: "company_forms/ods",
      socialMedias: "company_forms/socialMedias",
      url: "company_forms/url",
      logo: "company_forms/logo",
    }),
  },
  methods: {
    ...mapActions({
      setDescriptionLong: "company_forms/setDescriptionLong",
      setTechnologies: "company_forms/setTechnologies",
      setServices: "company_forms/setServices",
      setOds: "company_forms/setOds",
      setSocialMedias: "company_forms/setSocialMedias",
      setUrl: "company_forms/setUrl",
      setLogo: "company_forms/setLogo",
    }),
  },
};
</script>
