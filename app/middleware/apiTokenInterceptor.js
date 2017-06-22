let logger = require('../util/log');

module.exports = app =>
    class ApiTokenInterceptor extends app.middleware.GenericTokenInterceptor {
        constructor(ssoService) {
            super();
            this._ssoService = ssoService;
            this.liberar({method: ['POST'], path: /api\/v1\/dispositivos/});
        }

        intercept(req, res, next) {

            if (this.recursoLiberado(req)) {
                next();
                return;
            }

            let token = this.obterToken(req);

            if (!token) {
                logger.error(`ApiTokenInterceptor - intercept - O recurso requisitado exige autenticação.`);

                res.status(401)
                    .send('O recurso requisitado exige autenticação.');
                return;
            }

            this._ssoService.decodificarToken(token)
                .then(decoded => {
                    if (this._ssoService.possuiPermissaoParaOMonitrip(decoded)) {
                        req.idCliente = decoded.idCliente;
                        req.gmtCliente = decoded.timezone;
                        next();
                    }
                    else {
                        logger.error(`ApiTokenInterceptor - decodificarToken - A credencial informada não possui autorização para consumir o recurso.`);
                        res.status(403)
                            .send('A credencial informada não possui autorização para consumir o recurso.');
                    }
                })
                .catch(
                    erro =>
                    res.status(401)
                        .send('Token inválido. O recurso requisitado exige autenticação.')
            );
        }
    };
