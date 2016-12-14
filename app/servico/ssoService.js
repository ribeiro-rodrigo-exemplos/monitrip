const url = require('../../config/m2m-config')()['sso']['url'];
let restify = require('restify');
let jwt = require('jsonwebtoken');

class SSOService{
    constructor(app){
        this._client = restify.createJsonClient({url:url});
        this._tokenPass = app.get('jwt_key');
    }

    autenticar(credenciais){
        return new Promise((resolve,reject) => {
            this._client.post('/AutenticarUsuario',credenciais,(erro,req,res,result) => {
                if(erro){
                    this._resolveError(erro,resolve,reject);
                    return;
                }
                resolve(result);
            });
        });
    }

    decodificarToken(token){
        return new Promise((resolve,reject) => {
            jwt.verify(token,this._tokenPass,(erro,decoded) => {                 
                if(erro)
                    reject(erro);
                else   
                    resolve(decoded);
            });
        });
    }

    possuiPermissaoParaOMonitrip(decoded){
        decoded.funcionalidades.push('Monitrip');
        return decoded.funcionalidades.indexOf('Monitrip') >= 0 ? true:false;
    }

    _resolveError(erro,resolve,reject){
        if(!erro.body.RetornoOk){
            erro = new Error('Usuário ou senha incorretos');
            erro.status = 401;
        }

        reject(erro);
    }
}

let service;

module.exports = app => {
    if(!service)
        service = new SSOService(app);
    
    return service;
}