const safira = require('safira');

let controlador = safira.bean('infoController');
let app = safira.bean('app');

app.get('/info',controlador.obterInformacoesDaAplicacao.bind(controlador));

