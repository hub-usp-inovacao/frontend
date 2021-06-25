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
          <v-text-field label="E-mail" placeholder="Seu e-mail" />
          <v-text-field label="Nome Completo" />
          <v-radio-group label="Você representa uma:">
            <v-radio
              v-for="(option, i) of radioButtonData[0]"
              :key="i"
              :value="option"
              :label="option"
            />
            <v-radio label="Outro"> </v-radio>
          </v-radio-group>
        </v-container>

        <div class="my-2 text-h5 font-weight-regular">
          Organização
          <v-divider />
        </div>
        <v-container>
          <v-text-field label="Nome" />
          <v-text-field label="CNPJ" />
          <v-radio-group
            label="Você deseja manter sigilo em relação ao nome da organização?"
          >
            <v-radio value="Sim" label="Sim" />
            <v-radio value="Não" label="Não" />
          </v-radio-group>
          <v-radio-group label="Qual o porte da organização:">
            <v-radio
              v-for="(option, i) of radioButtonData[1]"
              :key="i"
              :value="option"
              :label="option"
            />
          </v-radio-group>
          <v-text-field label="E-mail" placeholder="E-mail da organização" />
          <v-text-field label="Telefone de Contato" />
          <v-text-field label="Endereço" />
          <v-text-field label="Cidade" />
        </v-container>

        <div class="my-2 text-h5 font-weight-regular">
          Demanda
          <v-divider />
        </div>
        <v-container>
          <v-radio-group
            label="Em qual das atividades econômicas sua demanda se encaixa?"
          >
          </v-radio-group>
          <div>
            Faça um breve resumo de sua demanda (Descrever o seu desafio e/ou
            problema para o qual busca uma solução)
          </div>
          <v-textarea
            clearable
            dense
            filled
            auto-grow
            autofocus
            :rows="textAreaSize"
            hint="Máximo 200 palavras"
          ></v-textarea>
          <v-radio-group
            label="Indique sua principal expectativa em relação a solução da
                demanda:"
          >
            <v-radio
              v-for="(option, i) of radioButtonData[2]"
              :key="i"
              :value="option"
              :label="option"
            />
            <v-radio label="Outro, qual?"> </v-radio>
          </v-radio-group>
          <v-radio-group
            label="Qual o perfil do pesquisador o(a) senhor(a) acredita poder sanar suas necessidades? Ou seja, qual deveria ser sua especialização, em sua opinião?"
          >
          </v-radio-group>
          <v-radio-group
            label="Qual a sua necessidade em relação a esses pesquisadores?"
          >
            <v-radio
              v-for="(option, i) of radioButtonData[3]"
              :key="i"
              :value="option"
              :label="option"
            />
            <v-radio label="Outro, qual?"> </v-radio>
          </v-radio-group>
        </v-container>

        <v-checkbox
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
        "Identificação de especialista para assessoria técnica na área de: SELECT COM SUBÁREA",
        "Identificação de startup para investimento ou contratação de serviços",
      ],
    ],
  }),
  computed: {
    textAreaSize() {
      return this.$breakpoint.smAndDown ? 16 : 5;
    },
  },
  methods: {
    submit() {
      this.loading = true;
      this.loading = false;
    },
  },
};
</script>
