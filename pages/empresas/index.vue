<template>
  <div>
    <Panel
      propsTitle="Empresas"
      propsDescription="São as empresas criadas por alunos e ex-alunos USP ao longo dos anos."
      propsUrl="https://docs.google.com/forms/d/e/1FAIpQLSd18N4l-8w2vu_aIWfRaSETG3nP94ZyvhNbh-4QFmNltKRkQw/viewform"
      propsImg="http://imagens.usp.br/wp-content/uploads/Projeto-Arte-e-Ci%C3%AAncia_IF_Foto-Marcos-Santos_U0Y8223-1-scaled.jpg"
    />

    <Grid
      :propsSheet="sheet"
      :propsIncubator="properties.incubator"
      :propsCampus="properties.campus"
      :propsUnity="properties.unity"
      :propsCNAE="properties.cnae"
    />
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import Panel from "@/components/Panel2.vue";

export default {
  components: {
    Grid,
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
