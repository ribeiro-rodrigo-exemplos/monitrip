const url = require('../bootstrap/config-bootstrap')()['sso']['url'];
let restify = require('restify');
let jwt = require('jsonwebtoken');
const logger = require('../util/log');

module.exports = app =>
    class SSOService {
        constructor() {
            this._client = restify.createJsonClient({url: url});
            this._apiTokenPass = app.get('jwt_api_key');
            this._webTokenPass = app.get('jwt_web_key');
        }

        autenticar(credenciais) {
            logger.info(`SSOService - autenticar - credenciais: ${credenciais}`);

            return new Promise((resolve, reject) => {
                this._client.post('/AutenticarUsuario', credenciais, (erro, req, res, result) => {
                    if (erro) {
                        this._resolveError(erro, reject);
                        return;
                    }
                    resolve(result);
                });
            });
        }


        possuiPermissaoParaOMonitrip(decoded) {
            logger.info(`SSOService - possuiPermissaoParaOMonitrip - decoded: ${decoded}`);
            return decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true : false;
        }

        decodificarToken(token) {
            logger.info(`SSOService - decodificarToken - token: ${token}`);
            return this._decodificarToken(token, this._apiTokenPass);
        }

        decodificarWebToken(token) {
            logger.info(`SSOService - decodificarWebToken - token: ${token}`);
            return this._decodificarToken(token, this._webTokenPass)
        }

        _decodificarToken(token, tokenPass) {
            logger.info(`SSOService - _decodificarToken - token: ${token} - tokenPass: ${tokenPass}`);

            return new Promise((resolve, reject) => {
                jwt.verify(token, tokenPass, (erro, decoded) => {
                    if (erro)
                        reject(erro);
                    else
                        resolve(decoded);
                });
            });
        }

        _resolveError(erro, reject) {
            if (!erro.body.RetornoOk) {
                erro = new Error('Usuário ou senha incorretos');
                logger.error(`SSOService - _resolveError - erro: ${erro}`);
                erro.status = 401;
            }
            reject(erro);
        }
    };

