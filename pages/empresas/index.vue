<template>
  <div>
    <Panel
      title="Empresas"
      description="Incubadoras e outras estruturas da Universidade facilitam a criação de empresas e negócios por parte de estudantes e pesquisadores. Estas são as empresas com DNA USP, que estão organizadas, no Portal Solus, por área de atuação e tecnologias aplicáveis."
      url="https://forms.gle/LjSkgb46xqcQdkkv6"
    />
    <v-container style="height: 20rem;">
      <v-row class="fill-height" justify="center" align="center">
        <div align="center" class="display-2 text-center">Página em construção</div>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  components: {
    Panel
  },
  data: () => ({
    sheet: [],
    properties: {
      incubator: [],
      campus: [],
      unity: [],
      cnae: []
    }
  }),
  methods: {
    async querySheet() {
      const request = await fetch(
        "https://spreadsheets.google.com/feeds/list/1cKw_4pAW_sQu0wUg1_iEOzIv7ITFJDDcsHMvp-qFx9o/o6mbfy9/public/values?alt=json"
      );
      const data = await request.json();

      data.feed.entry.forEach(item => {
        let company = {
          name: item.gsx$_cn6ca.$t,
          tech: item.gsx$tecnologiasqueutiliza.$t,
          logo: item.gsx$logo.$t,
          url: item.gsx$website.$t,
          description: item.gsx$descriçãodonegócio.$t,
          products: item.gsx$principaisprodutosouserviços.$t,
          incubator: item.gsx$incubadora.$t,
          campus: item.gsx$campus.$t,
          unity: item.gsx$unidadedossocios.$t,
          cnae: item.gsx$códigocnae.$t
        };

        if (!this.properties.incubator.includes(company.incubator))
          this.properties.incubator.push(company.incubator);

        if (!this.properties.campus.includes(company.campus))
          this.properties.campus.push(company.campus);

        if (!this.properties.unity.includes(company.unity))
          this.properties.unity.push(company.unity);

        if (!this.properties.cnae.includes(company.cnae))
          this.properties.cnae.push(company.cnae);

        if (company.url.substring(0, 4) != "http")
          company.url = "http://" + company.url;

        this.sheet.push(company);
      });

      Object.values(this.properties).forEach(property => {
        property.sort();
      });
    }
  },
  created() {
    this.querySheet();
  }
};
</script>
