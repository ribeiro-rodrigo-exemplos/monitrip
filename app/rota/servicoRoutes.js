const safira = require('safira');

let controlador = safira.bean('servicoController');
let app = safira.bean('app');

app.route('/api/v1/servicos')
    .get(controlador.obter.bind(controlador));
