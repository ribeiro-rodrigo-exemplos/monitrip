const safira = require('safira');

let controlador = safira.bean('bilheteController');
let app = safira.bean('app');

app.route('/api/v1/bilhetes')
    .get(controlador.obterBilhetes.bind(controlador));