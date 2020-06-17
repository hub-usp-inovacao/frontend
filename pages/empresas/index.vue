<template>
  <div>
    <div class="background">
      <Panel
        title="Empresas"
        description="Incubadoras e outras estruturas da Universidade facilitam a criação de empresas e negócios por parte de estudantes e pesquisadores.  Estas são as empresas com DNA USP que estão organizadas, no Portal Solus, por áreas de atuação e tecnologias aplicáveis. Com o nosso mecanismo de busca, é possível consultar as empresas por palavras-chave ou CNAEs (Classificação Nacional de Atividades Econômicas)."
        url="https://forms.gle/LjSkgb46xqcQdkkv6"
      />

      <CardButton :tabs="tabs" color="#2bc570" active="#82e3ae" @tab="updateTab($event)" />
    </div>

    <Background class="absolute" />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="filtered_entries">
        <template #content="{ item }">
          <p>{{ item.phone }}</p>
          <p>{{ item.email }}</p>

          <p>
            <span class="font-weight-bold">Descrição</span>
            {{ item.description.long }}
          </p>

          <p>
            <span class="font-weight-bold">Produtos e Serviços</span>
            {{ item.services }}
          </p>
        </template>
        <template #buttons="{ item }">
          <v-btn class="white--text" color="#2bc570" :href="item.url" target="_blank">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="filtered_entries">
        <template#item="{ item }">
          <v-container px-6>
            <p class="title">{{ item.name }}</p>
            <p>{{ item.phone }}</p>
            <p>{{ item.email }}</p>
            <p class="body-2 my-2"></p>
            <p>
              <span class="font-weight-bold">Descrição</span>
              {{ item.description.long }}
            </p>

            <p>
              <span class="font-weight-bold">Produtos e Serviços</span>
              {{ item.services }}
            </p>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed dark color="#2bc570" target="_blank" :href="item.url">Saiba Mais</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-container>
        </template>
      </SelectAndCard>
    </div>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import Background from "@/components/Background.vue";
import SelectAndCard from "@/components/SelectAndCard.vue";
import ListAndDetails from "@/components/ListAndDetails.vue";
import CardButton from "@/components/CardButton.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Panel,
    CardButton,
    Background,
    ListAndDetails,
    SelectAndCard
  },
  data: () => ({
    cnae: {
      "01": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "02": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "03": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "05": "Indústrias Extrativas",
      "06": "Extração de Petróleo e Gás Natural",
      "07": "Indústrias Extrativas",
      "08": "Indústrias Extrativas",
      "09": "Indústrias Extrativas",
      "10": "Alimentos",
      "11": "Bebidas",
      "12": "Produtos do Fumo",
      "13": "Produtos Têxteis",
      "14": "Vestuário e Acessórios",
      "15": "Artefatos de Couro, Artigos para Viagem e Calçados",
      "16": "Produtos de Madeira",
      "17": "Celulose e Papel",
      "18": "Impressão e Reprodução de Gravações",
      "19": "Coque, Derivados de Petróleo e de Biocombustíveis",
      "20": "Produtos Químicos",
      "21": "Produtos Farmaquímicos e Farmacêuticos",
      "22": "Produtos de Borracha e de Material Plástico",
      "23": "Produtos de Minerais Não-Metálicos",
      "24": "Metalurgia",
      "25": "Produtos de Metal, exceto Máquinas e Equipamentos",
      "26": "Equipamentos de Informática, Produtos Eletrônicos e Ópticos",
      "27": "Máquinas, Aparelhos e Materiais Elétricos",
      "28": "Máquinas e Equipamentos",
      "29": "Automóveis, Reboques e Carrocerias",
      "30": "Equipamentos de Transporte, exceto Veículos Automotores",
      "31": "Móveis",
      "32": "Produtos Diversos",
      "33": "Manutenção, Reparação e Instalação de Máquinas e Equipamentos",
      "34": "Eletricidade e Gás",
      "35": "Eletricidade e Gás",
      "36": "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
      "37": "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
      "38": "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
      "39": "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
      "40": "Água, Esgoto, Atividades de Gestão de Resíduos e Descontaminação",
      "41": "Construção",
      "42": "Construção",
      "43": "Construção",
      "44": "Construção",
      "45": "Comércio e Reparação de Veículos Automotores e Motocicletas",
      "46": "Comércio por Atacado, exceto Veículos Automotores e Motocicletas",
      "47": "Comércio Varejista",
      "48": "Comércio Varejista",
      "49": "Comércio Varejista",
      "50": "Comércio Varejista",
      "51": "Comércio Varejista",
      "52": "Comércio Varejista",
      "53": "Comércio Varejista",
      "54": "Comércio Varejista",
      "55": "Alojamento e Alimentação",
      "56": "Alojamento e Alimentação",
      "57": "Alojamento e Alimentação",
      "58": "Informação e Comunicação",
      "59": "Informação e Comunicação",
      "60": "Informação e Comunicação",
      "61": "Informação e Comunicação",
      "62": "Informação e Comunicação",
      "63": "Informação e Comunicação",
      "64": "Atividades Financeiras, de Seguros e Serviços Relacionados",
      "65": "Atividades Financeiras, de Seguros e Serviços Relacionados",
      "66": "Atividades Financeiras, de Seguros e Serviços Relacionados",
      "67": "Atividades Financeiras, de Seguros e Serviços Relacionados",
      "68": "Atividades Imobiliárias",
      "69": "Atividades Profissionais, Científicas e Técnicas",
      "70": "Atividades Profissionais, Científicas e Técnicas",
      "71": "Atividades Profissionais, Científicas e Técnicas",
      "72": "Atividades Profissionais, Científicas e Técnicas",
      "73": "Atividades Profissionais, Científicas e Técnicas",
      "74": "Atividades Profissionais, Científicas e Técnicas",
      "75": "Atividades Profissionais, Científicas e Técnicas",
      "76": "Atividades Profissionais, Científicas e Técnicas",
      "77": "Atividades Administrativas e Serviços Complementares",
      "78": "Atividades Administrativas e Serviços Complementares",
      "79": "Atividades Administrativas e Serviços Complementares",
      "80": "Atividades Administrativas e Serviços Complementares",
      "81": "Atividades Administrativas e Serviços Complementares",
      "82": "Atividades Administrativas e Serviços Complementares",
      "83": "Atividades Administrativas e Serviços Complementares",
      "84": "Administração Pública, Defesa e Seguridade Social",
      "85": "Educação",
      "86": "Saúde Humana e Serviços Sociais",
      "87": "Saúde Humana e Serviços Sociais",
      "88": "Saúde Humana e Serviços Sociais",
      "89": "Saúde Humana e Serviços Sociais",
      "90": "Artes, Cultura, Esporte e Recreação",
      "91": "Artes, Cultura, Esporte e Recreação",
      "92": "Artes, Cultura, Esporte e Recreação",
      "93": "Artes, Cultura, Esporte e Recreação",
      "94": "Outras Atividades de Serviços",
      "95": "Outras Atividades de Serviços",
      "96": "Outras Atividades de Serviços",
      "97": "Serviços Domésticos",
      "98": "Serviços Domésticos",
      "99": "Organismos Internacionais e outras Instituições Extraterritoriais"
    },
    selectedCNAEs: []
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "empresas/fetchSpreadsheets"
    }),
    updateTab(tab) {
      this.selectedCNAEs = Array.from(this.tabs[tab].codes);
    }
  },
  computed: {
    ...mapGetters({
      dataStatus: "empresas/dataStatus",
      companies: "empresas/companies"
    }),
    tabs() {
      const dict = this.companies.reduce((dict, c) => {
        const code = c.category.code.substr(0, 2);

        if (!dict[this.cnae[code]]) {
          dict[this.cnae[code]] = {
            name: this.cnae[code],
            codes: new Set([c.category.code])
          };
        } else {
          dict[this.cnae[code]].codes.add(c.category.code);
        }

        return dict;
      }, {});

      return Object.values(dict);
    },
    filtered_entries() {
      return this.companies.filter(c =>
        this.selectedCNAEs.includes(c.category.code)
      );
    },
    selectedCNAECode() {
      const tabName = this.tabs[this.current_tab_index].name;
      console.log(tabName);
      return tabName;
    }
  },
  beforeMount() {
    if (this.dataStatus == "ok" && this.companies.length == 0) {
      this.fetchSpreadsheets({
        sheetsAPIKey: process.env.sheetsAPIKey,
        sheetID: process.env.sheetID
      });
    }
  }
};
</script>
