const safira = require('safira');

let controlador = safira.bean('pontoController');
let app = safira.bean('app');

app.route('/api/v1/ponto')
    .get(controlador.obterPontos.bind(controlador));