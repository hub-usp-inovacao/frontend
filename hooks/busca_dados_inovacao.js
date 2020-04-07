import axios from 'axios';
import fs from 'fs';

let campi_list = [];
let unity_list = [];
let known_list = [];

let entries = [];

let sheet_name = "D&I";
let sheet_id = "1VZR_UAGJGD-hkc_ukuKLEsxaNpP2rNQ-OpnN59zwsIY";
let api_key = "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY";

let tabs = [
      // {
      //   name: "Centrais multiusuários",
      //   description: "",
      //   entries: []
      // },
      {
        name: "CEPIDS",
        description:
          "Centros de Pesquisa, Inovação e Difusão (CEPIDs), apoiados pela FAPESP, que atuam com o desenvolvimento de pesquisa básica ou aplicada, com impacto comercial e social relevante.",
        entries: []
      },
      {
        name: "EMBRAPII",
        description:
          "A Associação Brasileira de Pesquisa e Inovação Industrial é uma organização que apoia instituições de pesquisa tecnológica, em selecionadas áreas de competência, para que executem projetos de desenvolvimento de pesquisa tecnológica para inovação, em cooperação com empresas do setor industrial.",
        entries: []
      },
      {
        name: "INCTs",
        description:
          "Os Institutos Nacionais de Ciência e Tecnologia são laboratórios orientados a estimular o desenvolvimento de pesquisa científica e tecnológica para promover a inovação e o espírito empreendedor.",
        entries: []
      }
      // {
      //   name: "Outros",
      //   description: "",
      //   entries: []
      // }
];

function compare_string(a, b) {
  return a.localeCompare(b);
}

export default function() {
  let campi = new Set();
  let unity = new Set();
  let known = new Set();
  let data = {};
  
  axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/'${sheet_name}'?key=${api_key}`)
    .then(response => response.data)
    .then(data => {
      data.values.slice(1).forEach(row => {
        let di = {
          category: row[0],
          name: row[1],
          campus: row[2],
          unity: row[3],
          url: row[5],
          description: {
            short: row[9],
            long: row[8]
          },
          knownledge: row[11].split(/,/),
          key_words: row[13]
        };
        
        let tab = tabs.find(
          tab => tab.name.localeCompare(di.category) == 0
        );
  
        if (tab) {
          campi.add(di.campus);
          unity.add(di.unity);
          di.knownledge.forEach(item => {
            if (item) known.add(item);
          });
          tab.entries.push(di);
        }
      });
    })
    .then(() => {
      campi_list = Array.from(campi).sort(compare_string);
      unity_list = Array.from(unity).sort(compare_string);
      known_list = Array.from(known).sort(compare_string);
      entries = tabs[0].entries;
  
     	let data = {
  	  	campi_list,
  	  	unity_list,
  	  	known_list,
  
    		entries,

    		tabs,
    	};
      fs.writeFile('./data/inovacao.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('inovacao.json criado com sucesso');
      });
    });
}
