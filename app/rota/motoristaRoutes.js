const routeCache = require('route-cache');
const safira = require('safira');

let controlador = safira.bean('motoristaController');
let app = safira.bean('app');

app.get('/api/v1/motoristas',controlador.obter.bind(controlador));
