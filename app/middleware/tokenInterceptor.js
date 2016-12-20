class TokenInterceptor{
    constructor(app){
        this._ssoService = app.servico.ssoService;
    }

    intercept(req,res,next){
        let token = req.get('X-AUTH-TOKEN');

        if(!token){
            res.status(401)
                .send('O recurso requisitado exige autenticação.');
            return;
        }

        this._ssoService.decodificarToken(token)
                .then(decoded => {
                    if(this._ssoService.possuiPermissaoParaOMonitrip(decoded))
                        next();
                    else
                        res.status(403)
                            .send('A credencial informada não possui autorização para consumir o recurso.');
                })
                .catch(
                        erro => 
                            res.status(401)
                                .send('Token inválido. O recurso requisitado exige autenticação.')
                      ); 
    }
}

module.exports = app => new TokenInterceptor(app);