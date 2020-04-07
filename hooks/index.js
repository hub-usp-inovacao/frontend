import dados_inovacao from './busca_dados_inovacao';
import dados_competencias from './busca_dados_competencias';
import dados_educacao from './busca_dados_educacao';

export default function() {
  dados_inovacao();
  dados_competencias();
  dados_educacao();
}
