const safira = require('safira');

let controlador = safira.bean('licencaController');
let app = safira.bean('app');

app.get('/web/v1/licencas', controlador.obterLicencasDoCliente.bind(controlador));
app.get('/web/v1/clientes/:id/licencas', controlador.obterLicencasDoClientePorId.bind(controlador));

