const routeCache = require('route-cache');
const cacheConfig = require('../bootstrap/config-bootstrap')()['cache'];

module.exports = app => {
    let controlador = app.beans.factory.veiculoController;

    app.get('/api/v1/veiculos',controlador.obter.bind(controlador));
};