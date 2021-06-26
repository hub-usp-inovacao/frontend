<template>
  <div class="background">
    <div>
      <Panel
        title="Conexão USP"
        description="Este Programa da Agência USP de Inovação tem por objetivo oferecer a intermediação e o contato entre parceiros (empresas, entidades sem fins lucrativos e governo) e os pesquisadores da Universidade de São Paulo.
                    Neste programa, os parceiros apresentam suas demandas para que identifiquemos pesquisadores na Universidade que tenham a soluções ou propostas de projetos de pesquisa que atendam estas necessidades."
        no-search
      />
    </div>

    <v-row style="background: white">
      <v-col>
        <v-img
          class="mx-auto"
          width="300"
          height="128"
          :src="require('@/vectors/conexao.svg')"
          alt="logo conexao"
        />
      </v-col>
    </v-row>

    <v-container class="pa-10">
      <v-form>
        <div class="my-2 text-h5 font-weight-regular">
          Dados Pessoais
          <v-divider />
        </div>
        <v-container>
          <v-text-field
            v-model="values.personal.email"
            label="E-mail"
            placeholder="Seu e-mail"
          />
          <v-text-field v-model="values.personal.name" label="Nome Completo" />
          <div>
            <v-radio-group
              v-model="values.personal.represent"
              label="Você representa uma:"
              @change="enableOtherOption('personal', 'represent')"
            >
              <v-radio
                v-for="(option, i) of radioButtonData[0]"
                :key="i"
                :value="option"
                :label="option"
              />
              <v-radio label="Outro, qual?" value="Outro" />
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-if="values.personal.hasOwnProperty('representOther')"
                  v-model="values.personal.representOther"
                  class="mt-n5 pt-0"
                  placeholder="Outro, qual?"
                  autofocus
                />
              </v-col>
            </v-row>
          </div>
        </v-container>

        <div class="my-2 text-h5 font-weight-regular">
          Organização
          <v-divider />
        </div>
        <v-container>
          <v-text-field v-model="values.org.name" label="Nome" />
          <v-text-field v-model="values.org.cnpj" label="CNPJ" />
          <v-radio-group
            v-model="values.org.sensitiveData"
            label="Você deseja manter sigilo em relação ao nome da organização?"
          >
            <v-radio :value="true" label="Sim" />
            <v-radio :value="false" label="Não" />
          </v-radio-group>
          <v-radio-group
            v-model="values.org.size"
            label="Qual o porte da organização:"
          >
            <v-radio
              v-for="(option, i) of radioButtonData[1]"
              :key="i"
              :value="option"
              :label="option"
            />
          </v-radio-group>
          <v-text-field
            v-model="values.org.email"
            label="E-mail"
            placeholder="E-mail da organização"
          />
          <v-text-field
            v-model="values.org.phone"
            label="Telefone de Contato"
          />
          <v-text-field v-model="values.org.address" label="Endereço" />
          <v-text-field v-model="values.org.city" label="Cidade" />
        </v-container>

        <div class="my-2 text-h5 font-weight-regular">
          Demanda
          <v-divider />
        </div>
        <v-container>
          <div>
            <legend text class="legendColor">
              Em qual das atividades econômicas sua demanda se encaixa?
            </legend>
            <v-row>
              <v-col>
                <v-select
                  v-model="values.demand.cnae.major"
                  label="Área Primária"
                  :items="cnaeMajors"
                  clearable
                />
              </v-col>
              <v-col>
                <v-select
                  v-model="values.demand.cnae.minor"
                  label="Área Secundária"
                  :items="cnaeMinors(values.demand.cnae.major)"
                  no-data-text="Selecione uma área primária antes"
                  clearable
                />
              </v-col>
            </v-row>
          </div>

          <div>
            <legend class="legendColor">
              Faça um breve resumo de sua demanda (Descrever o seu desafio e/ou
              problema para o qual busca uma solução)
            </legend>
            <v-textarea
              clearable
              dense
              filled
              auto-grow
              autofocus
              :rows="textAreaSize"
              hint="Máximo 200 palavras"
            ></v-textarea>
          </div>

          <div>
            <v-radio-group
              v-model="values.demand.expectation"
              label="Indique sua principal expectativa em relação a solução da
                demanda:"
              @change="enableOtherOption('demand', 'expectation')"
            >
              <v-radio
                v-for="(option, i) of radioButtonData[2]"
                :key="i"
                :value="option"
                :label="option"
              />
              <v-radio label="Outro, qual?" value="Outro" />
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-if="values.demand.hasOwnProperty('expectationOther')"
                  v-model="values.demand.expectationOther"
                  class="mt-n5 pt-0"
                  placeholder="Outro, qual?"
                  autofocus
                />
              </v-col>
            </v-row>
          </div>

          <v-row>
            <v-col sm="12" md="6">
              <legend class="legendColor">
                Qual o perfil do pesquisador o(a) senhor(a) acredita poder sanar
                suas necessidades? Ou seja, qual deveria ser sua especialização,
                em sua opinião?
              </legend>
              <v-select
                v-model="values.demand.wantedProfile"
                :items="cnpqAreas"
                label="Escolha um perfil"
                clearable
              >
                <template v-slot:label> </template>
              </v-select>
            </v-col>
          </v-row>

          <div>
            <v-radio-group
              v-model="values.demand.necessity"
              label="Qual a sua necessidade em relação a esses pesquisadores?"
              @change="enableOtherOption('demand', 'necessity')"
            >
              <v-radio
                v-for="(option, i) of radioButtonData[3]"
                :key="i"
                :value="option"
                :label="option"
              />
              <v-radio
                value="Identificação de especialista para assessoria técnica"
              >
                <template v-slot:label>
                  <p class="my-auto">
                    Identificação de especialista para assessoria técnica na
                    área de
                  </p>
                  <div class="mb-n3 ml-2">
                    <v-select
                      v-model="selectedArea"
                      :items="cnpqAreas"
                      label="Escolha uma área"
                      clearable
                      dense
                    />
                  </div>
                </template>
              </v-radio>
              <v-radio label="Outro, qual?" value="Outro" />
            </v-radio-group>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-if="values.demand.hasOwnProperty('necessityOther')"
                  v-model="values.demand.necessityOther"
                  class="mt-n5 pt-0"
                  placeholder="Outro, qual?"
                  autofocus
                />
              </v-col>
            </v-row>
          </div>
        </v-container>

        <v-checkbox
          v-model="confirmation"
          label="Concordo com todas as normas e funcionamento do Programa Conexão USP"
        />

        <v-row>
          <v-col class="text-center">
            <v-btn
              color="tertiary"
              width="100"
              text
              :loading="loading"
              @click="submit"
            >
              Enviar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Panel from "@/components/first_level/Panel.vue";

export default {
  components: {
    Panel,
  },
  data: () => ({
    values: {
      personal: {
        email: "",
        name: "",
        represent: "",
      },
      org: {
        email: "",
        name: "",
        cnpj: "",
        sensitiveData: "",
        size: "",
        phone: "",
        address: "",
        city: "",
      },
      demand: {
        cnae: {
          major: "",
          minor: "",
        },
        expectation: "",
        wantedProfile: "",
        necessity: "",
      },
    },
    loading: false,
    radioButtonData: [
      ["Empresa", "Organização sem fins lucatrivos", "Governo", "Consultoria"],
      ["Pequena", "Média", "Grande"],
      [
        "Melhoria de Produto",
        "Melhoria em Processo",
        "Melhoria em Serviço",
        "Melhoria em Tecnologia",
        "Novo produto",
        "Novo processo",
        "Novo serviço",
        "Nova tecnologia",
        "Prestação de serviço e/ou consultoria especializada",
      ],
      [
        "Licenciamento de patentes",
        "Identificação de novas tecnologias",
        "Auxílio técnico para validação de equipamentos e produtos",
        "Utilização de laboratórios para ensaios e testes",
        "Desenvolvimento de P&D em parceria",
        "Identificação de startup para investimento ou contratação de serviços",
      ],
    ],
    selectedArea: "",
    confirmation: false,
  }),
  computed: {
    textAreaSize() {
      return this.$breakpoint.smAndDown ? 16 : 5;
    },
    cnaeMajors() {
      return Object.keys(this.$reverseCNAE);
    },
    cnpqAreas() {
      return this.$knowledgeAreas.map((area) => {
        let { name } = area;
        name = name.replace(/Ciências (da )?/, "");
        return name;
      });
    },
  },
  methods: {
    enableOtherOption(model, value) {
      if (this.values[model][value] == "Outro") {
        this.values[model][`${value}Other`] = "";
      } else {
        delete this.values[model][`${value}Other`];
      }
    },
    cnaeMinors(major) {
      if (!major) return undefined;
      return this.$reverseCNAE[major].map(({ minor }) => minor);
    },
    dataChecking() {
      if (this.values.personal.represent == "Outro") {
        this.values.personal.represent = this.values.personal.representOther;
        delete this.values.personal.representOther;
      }

      if (this.values.demand.expectation == "Outro") {
        this.values.demand.expectation = this.values.demand.expectationOther;
        delete this.values.demand.expectationOther;
      }

      if (this.values.demand.necessity == "Outro") {
        this.values.demand.necessity = this.values.demand.necessityOther;
        delete this.values.demand.necessityOther;
      }

      if (
        this.values.demand.necessity ==
        "Identificação de especialista para assessoria técnica"
      )
        this.values.demand.necessity += " na área de " + this.selectedArea;
    },
    submit() {
      this.loading = true;
      this.dataChecking();
      console.log(this.values);
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.legendColor {
  color: rgba(0, 0, 0, 0.6);
}
</style>
