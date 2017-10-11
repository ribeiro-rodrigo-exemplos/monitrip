const safira = require('safira');

let controlador = safira.bean('veiculoController');
let app = safira.bean('app');

app.get('/api/v1/veiculos',controlador.obter.bind(controlador));
