<template>
  <div>
    <div class="background">
      <Panel
        title="Empresas"
        description="Incubadoras e outras estruturas da Universidade facilitam a criação de empresas e negócios por parte de estudantes e pesquisadores. Estas são as empresas com DNA USP que estão organizadas, no Portal Solus, por áreas de atuação e tecnologias aplicáveis. Com o nosso mecanismo de busca, é possível consultar as empresas por palavras-chave ou CNAEs (Classificação Nacional de Atividades Econômicas)."
        url="https://forms.gle/LjSkgb46xqcQdkkv6"
        v-model="search.term"
      />
      <USPDNA />
    </div>

    <Background />

    <MultipleFilters
      :tabs="tabs"
      :groups="groups"
      :colors="{ base: '#074744', active: '#0A8680' }"
      @select="filterData($event)"
    />

    <div class="hidden-sm-and-down">
      <ListAndDetails :items="displayItems">
        <template #content="{ item }">
          <v-container>
            <v-row>
              <v-col cols="8">
                <v-container>
                  <v-row>
                    <v-col>
                      <p v-for="phone in item.phones" :key="phone">{{ phone }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <p class="body-2 mb-2">{{ item.email }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col cols="4">
                <v-img eager v-if="item.logo" :src="item.logo"></v-img>
              </v-col>
            </v-row>
          </v-container>

          <p>
            <span class="font-weight-bold">Descrição</span>
            {{ item.description.long }}
          </p>

          <p>
            <span class="font-weight-bold">Produtos e Serviços</span>
            {{ item.services }}
          </p>

          <p>
            <span class="font-weight-bold">Tecnologias</span>
            {{ item.technologies }}
          </p>
        </template>
        <template #buttons="{ item }">
          <v-btn class="white--text" color="#2bc570" :href="item.url" target="_blank">Saiba Mais</v-btn>
        </template>
      </ListAndDetails>
    </div>

    <div class="hidden-md-and-up">
      <SelectAndCard :items="displayItems">
        <template #item="{ item }">
          <v-container px-6>
            <p class="title">{{ item.name }}</p>
            <v-img eager v-if="item.logo" :src="item.logo"></v-img>
            <p v-for="phone in item.phones" :key="phone">{{ phone }}</p>
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

            <p>
              <span class="font-weight-bold">Tecnologias</span>
              {{ item.technologies }}
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
import { mapActions, mapGetters } from "vuex";
import { capitalizeName, genFuzzyOptions } from "@/lib";
import { debounce } from "debounce";

import Background from "@/components/first_level/Background.vue";
import USPDNA from "@/components/first_level/USPDNA.vue";
import Panel from "@/components/first_level/Panel.vue";
import MultipleFilters from "@/components/first_level/MultipleFilters.vue";
import ListAndDetails from "@/components/first_level/ListAndDetails.vue";
import SelectAndCard from "@/components/first_level/SelectAndCard.vue";

export default {
  components: {
    Panel,
    MultipleFilters,
    Background,
    ListAndDetails,
    SelectAndCard,
    USPDNA,
  },
  data: () => ({
    baseTabs: [
      {
        name: "Agricultura, Pecuária, Pesca e Extrativismo",
        CNAECodes: ["01", "02", "03", "04", "05", "06", "07", "08", "09"],
      },
      {
        name: "Indústria de Transformação",
        CNAECodes: [
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
        ],
      },
      {
        name: "Infraestrutura e Construção",
        CNAECodes: ["35", "36", "37", "38", "39", "40", "41", "42", "43"],
      },
      {
        name: "Comércio e Serviços",
        CNAECodes: [
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
          "66",
          "67",
          "68",
          "94",
          "95",
          "96",
          "97",
        ],
      },
      {
        name: "Atividades Profissionais, Científicas e Técnicas",
        CNAECodes: [
          "69",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "80",
          "81",
          "82",
          "83",
          "84",
          "99",
        ],
      },
      {
        name: "Educação, Artes e Esportes",
        CNAECodes: ["85", "90", "91", "92", "93"],
      },
      {
        name: "Saúde e Serviços Sociais",
        CNAECodes: ["86", "87", "88"],
      },
    ],
    cnae: {
      "01": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "02": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "03": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
      "04": "Agricultura, Pecuária, Produção Florestal, Pesca e Aquicultura",
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
      "99": "Organismos Internacionais e outras Instituições Extraterritoriais",
    },
    filtered: undefined,
    search: {
      term: "",
      companies: undefined,
    },
  }),
  methods: {
    ...mapActions({
      fetchSpreadsheets: "empresas/fetchSpreadsheets",
    }),
    filterFun(item, { primary, secondary, terciary }) {
      let primaryMatch, secondaryMatch, terciaryMatch;

      if (primary.length == 0) {
        primaryMatch = true;
      } else {
        primaryMatch = primary
          .reduce(
            (codes, p) =>
              codes.concat(
                this.baseTabs.find(({ name }) => name === p).CNAECodes
              ),
            []
          )
          .includes(item.category.code);
      }

      if (secondary.length == 0) {
        secondaryMatch = true;
      } else {
        secondaryMatch = secondary
          .reduce((codes, s) => codes.concat(this.reverseCNAEmap[s]), [])
          .includes(item.category.code);
      }

      const [city, incubated] = terciary;

      terciaryMatch = true;

      if (incubated) {
        terciaryMatch = terciaryMatch && incubated == item.incubated;
      }

      return primaryMatch && secondaryMatch && terciaryMatch;
    },
    filterData(context) {
      this.filtered = this.companies.filter((item) =>
        this.filterFun(item, context)
      );
    },
    async fuzzySearch() {
      if (!this.search.term.trim()) {
        this.search.companies = undefined;
        return;
      }

      this.search.companies = await this.$search(
        this.search.term.trim(),
        this.baseItems,
        genFuzzyOptions(this.searchKeys)
      );
    },
  },
  watch: {
    searchTerm: debounce(async function () {
      console.log("running search");
      await this.fuzzySearch();
    }, 1250),
  },
  computed: {
    ...mapGetters({
      dataStatus: "empresas/dataStatus",
      companies: "empresas/companies",
      searchKeys: "empresas/searchKeys",
    }),
    searchTerm() {
      return this.search.term;
    },
    tabs() {
      return this.baseTabs.map((tab) => ({
        ...tab,
        subareas: tab.CNAECodes.map((code) => this.cnae[code])
          .filter((name, i, all) => {
            const index = all
              .sort((a, b) => b.localeCompare(a))
              .findIndex((n) => n === name);

            return i === index;
          })
          .sort((a, b) => a.localeCompare(b)),
      }));
    },
    baseItems() {
      return this.filtered !== undefined ? this.filtered : this.companies;
    },
    displayItems() {
      return this.search.companies !== undefined
        ? this.search.companies
        : this.baseItems;
    },
    reverseCNAEmap() {
      return Object.keys(this.cnae).reduce((rev, code) => {
        const name = this.cnae[code];

        if (rev[name] === undefined) {
          rev[name] = [];
        }

        rev[name].push(code);

        return rev;
      }, {});
    },
    cities() {
      return this.companies
        .map(({ address: { city } }) => city)
        .reduce((all, citites) => all.concat(citites), [])
        .map((city) =>
          city
            .toLocaleLowerCase()
            .replace(/\(.+\)/, "")
            .replace(/^sao /, "são")
            .replace(/\ +/, " ")
            .trim()
        )
        .filter((city) => city.length >= 0)
        .filter((city, i, cities) => {
          const index = cities
            .sort((a, b) => b.localeCompare(a))
            .findIndex((c) => c === city);

          return index === i;
        })
        .sort();
    },
    groups() {
      return [
        { label: "Cidade", items: [] },
        { label: "Incubadora?", items: ["Sim", "Não"] },
      ];
    },
  },
  beforeMount() {
    if (this.dataStatus == "ok" && this.companies.length == 0) {
      this.fetchSpreadsheets({
        sheetsAPIKey: process.env.sheetsAPIKey,
        sheetID: process.env.sheetID,
      });
    }
  },
};
</script>
