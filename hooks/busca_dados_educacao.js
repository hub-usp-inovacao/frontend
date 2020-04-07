import axios from 'axios'
import fs from 'fs'

const sheet_name = "DISCIPLINAS";
const sheet_id = "1VZR_UAGJGD-hkc_ukuKLEsxaNpP2rNQ-OpnN59zwsIY";
const api_key = "AIzaSyCztTmPhvMVj7L_ZBxF4hEPv974x8UcJOY";

let campi_list = [];
let unity_list = [];
let entries = [];
let tabs = [
  {
    name: "Graduação",
    entries: []
  },
  {
    name: "Pós-Graduação",
    entries: []
  }
];

function compare_string(a, b) {
  return a.localeCompare(b);
}

export default function() {
  let campi = new Set();
  let unity = new Set();
  axios.get(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/'${sheet_name}'?key=${api_key}`
  )
    .then(response => response.data)
    .then(data => {
      data.values.slice(1).forEach(row => {
        let di = {
          title: row[0],
          description: {
            short: row[3],
            long: row[8]
          },
          campus: row[4],
          unity: row[5],
          category: row[6],
          url: row[7],
          area: row[9],
          start_date: row[10]
        };
        campi.add(di.campus);
        unity.add(di.unity);
        if (row[1].localeCompare("Graduação") === 0)
          tabs[0].entries.push(di);
        else this.tabs[1].entries.push(di);
      });
    })
    .then(() => {
      campi_list = Array.from(campi).sort(compare_string);
      unity_list = Array.from(unity).sort(compare_string);
      entries = tabs[0].entries;

      let data = {
        campi_list,
        unity_list,
        entries,
        tabs,
      };
      fs.writeFile('./data/educacao.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('educacao.json criado com sucesso');
      });
    });
}
