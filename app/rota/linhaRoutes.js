const routeCache = require('route-cache');
const safira = require('safira');
var mysqlConfig = safira.bean('config').mysql.frota;

let controlador = safira.bean('linhaController');
let app = safira.bean('app');

app.get('/api/v1/linhas',controlador.obter.bind(controlador));
