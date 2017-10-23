const safira = require('safira');
let url =  safira.bean('config').sso.url;
let restify = require('restify');
let jwt = require('jsonwebtoken');

class SSOService {
    constructor(logger, app, config) {
        this._client = restify.createJsonClient({url: url});
        this._apiTokenPass = config.jwt['api_key'];
        this._webTokenPass = config.jwt['web_key'];
        this._logger = logger;
    }

    autenticar(credenciais) {
        this._logger.info(`SSOService - autenticar - credenciais: ${credenciais}`);

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
        console.log(decoded.funcionalidades);
        this._logger.info(`SSOService - possuiPermissaoParaOMonitrip: ${decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true : false}`);
        return decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true : false;
    }

    decodificarToken(token) {
        return this._decodificarToken(token, this._apiTokenPass);
    }

    decodificarWebToken(token) {
        return this._decodificarToken(token, this._webTokenPass)
    }

    _decodificarToken(token, tokenPass) {
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
            this._logger.error(`SSOService - _resolveError - erro: ${erro}`);
            erro.status = 401;
        }
        reject(erro);
    }
};

safira.define(SSOService, 'ssoService');
