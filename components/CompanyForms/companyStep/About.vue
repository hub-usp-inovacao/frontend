<template>
  <v-container>
    <v-form>
      <div class="mt-5 text-h6 font-weight-regular">
        Comunicação
        <v-divider />
        <v-container>
          <LongTextInput
            :value="description"
            label="Insira uma breve descrição da empresa"
            clearable
            hint="Descreva seu negócio, levando em consideração qual tipo de solução a mesma traz para o mercado. Busque deixar claro o posicionamento da mesma no mercado. Essa informação será divulgada."
            @input="setDescription"
          />
          <URLInput
            :value="site"
            label="Site"
            hint="Se não possuir, responda N/D."
            @input="setSite"
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
                :value="productsAndServices"
                input-label="Produto/Serviço"
                @input="setProductsAndServices"
              />
            </v-container>
          </div>

          <div class="mt-5 text-h6 font-weight-regular">
            Sua empresa está alinhada a das alguma ODS?
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
      description: "company_forms/description",
      technologies: "company_forms/technologies",
      productsAndServices: "company_forms/productsAndServices",
      ods: "company_forms/ods",
      socialMedias: "company_forms/socialMedias",
      site: "company_forms/site",
      logo: "company_forms/logo",
    }),
  },
  methods: {
    ...mapActions({
      setDescription: "company_forms/setDescription",
      setTechnologies: "company_forms/setTechnologies",
      setProductsAndServices: "company_forms/setProductsAndServices",
      setOds: "company_forms/setOds",
      setSocialMedias: "company_forms/setSocialMedias",
      setSite: "company_forms/setSite",
      setLogo: "company_forms/setLogo",
    }),
  },
};
</script>
