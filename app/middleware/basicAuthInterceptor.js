/**
 * Created by rodrigo on 10/03/17.
 */

const basicAuth = require('basic-auth');
let logger = require('../util/log');

module.exports = () =>
    class BasicAuthInterceptor {
        constructor() {
        }

        intercept(req, res, next) {
            const usuario = basicAuth(req);

            if (!usuario || usuario.name != 'm2m' || usuario.pass != 'm2m')
                return this._naoAutorizado(res);

            next();
        }

        _naoAutorizado(res) {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            return res.send(401);
        }
    };