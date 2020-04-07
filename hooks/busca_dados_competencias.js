import axios from 'axios'
import fs from 'fs'

let campi_list = [];
let unity_list = [];
let association_list = [];
let known_list = [];
let search_entries = [];
let entries = [];

let tabs = [
  {
    name: "Competências",
    entries: []
  },
  {
    name: "Inovação",
    entries: []
  }
];

const sheet_name = "RESPOSTAS";
const sheet_id = "18l8qAjZuJU6jMqoY8ohYc4FsaIoNqg_GjCa5htYPBm8";
const api_key = "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY";

function compare_string(a, b) {
  return a.localeCompare(b);
}

export default function() {
  let campi = new Set();
  let unity = new Set();
  let association = new Set();
  let known = new Set();

  let regex_url = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

  axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/'${sheet_name}'?key=${api_key}`)
    .then(response => response.data)
    .then(data => {
      data.values.slice(1).forEach(row => {
        let di = {
          association: row[1],
          name: row[2],
          email: row[3],
          unity: row[5],
          campus: row[6],
          role: row[7],
          category: row[8],
          group_name: row[9],
          group_initials: row[10],
          description: row[11],
          url: row[12].match(regex_url),
          skills: row[13],
          services: row[14].split(/[\s\n]*[;][\s\n]*/),
          equipment: row[15].split(/[\s\n]*[;][\s\n]*/),
          knownledge: row[16].split(/,/),
          key_words: row[17].split(/[\s\n]*[;][\s\n]*/)
        };

        if (di.campus) campi.add(di.campus);
        if (di.unity) unity.add(di.unity);
        if (di.association) association.add(di.association);
        di.knownledge.forEach(item => known.add(item));
        entries.push(di);
      })
    })
    .then(() => {
      campi_list = Array.from(campi).sort(compare_string);
      unity_list = Array.from(unity).sort(compare_string);
      association_list = Array.from(association).sort(compare_string);
      known_list = Array.from(known).sort(compare_string);
      search_entries = entries;

      let data = {
        campi_list,
        unity_list,
        association_list,
        known_list,
        search_entries,
        entries,
        tabs,
      };

      fs.writeFile('./data/competencias.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('competencias.json criado com sucesso');
      });
    });
};
