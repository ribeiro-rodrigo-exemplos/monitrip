const routeCache = require('route-cache');
const cacheConfig = require('../bootstrap/config-bootstrap')()['cache'];

module.exports = function (app) {

    let controlador = app.beans.factory.motoristaController;

    app.get('/api/v1/motoristas', routeCache.cacheSeconds(cacheConfig.motorista.seconds), controlador.obter.bind(controlador));
};