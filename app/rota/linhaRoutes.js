const safira = require('safira');

let controlador = safira.bean('linhaController');
let app = safira.bean('app');

app.route('/api/v1/linha/:idCliente')
    .get(controlador.obterLinhas.bind(controlador));