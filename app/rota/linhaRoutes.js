const routeCache = require('route-cache');
const cacheConfig = require('../bootstrap/config-bootstrap')()['cache'];

module.exports = app => {
    let controlador = app.beans.factory.linhaController;
    app.get('/api/v1/linhas',controlador.obter.bind(controlador));
};