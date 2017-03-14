let logger = require('../util/log');

module.exports = () =>
    class GenericTokenInterceptor {
        constructor() {
            this._recursosLiberados = [];
        }

        liberar(...recursos) {
            this._recursosLiberados.push(...recursos);
        }

        obterToken(req) {
            return req.get('Authorization');
        }

        intercept(req, res, next) {
            throw new Error('O método intercept deve ser implementado');
        }

        recursoLiberado(req) {

            if (req.method == 'OPTIONS' || req.method == 'HEAD') {
                return true;
            }

            return this._recursosLiberados.some(recurso =>
                recurso.method.includes(req.method) && recurso.path.test(req.baseUrl)
            );
        }
    };