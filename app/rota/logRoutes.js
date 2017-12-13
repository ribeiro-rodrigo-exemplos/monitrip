const safira = require('safira');

let controlador = safira.bean('logController');
let app = safira.bean('app');

app.post('/api/v1/logs', controlador.inserirLog.bind(controlador));
app.get('/web/v1/logs', controlador.obterLogs.bind(controlador));
app.get('/web/v1/combo/logs', controlador.obterComboLogs.bind(controlador));
