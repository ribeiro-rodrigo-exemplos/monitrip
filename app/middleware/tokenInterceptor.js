module.exports = () =>
    class TokenInterceptor{
        constructor(ssoService){
            this._ssoService = ssoService;
            this._recursosLiberados = [
                {
                    method:'POST',
                    path:'/v1/dispositivos'
                }
            ];
        }

        intercept(req,res,next){
            
            if(this._recursoLiberado(req)){
                next();
                return;
            }

            let token = req.get('X-AUTH-TOKEN');

            if(!token){
                res.status(401)
                    .send('O recurso requisitado exige autenticação.');
                return;
            }

            this._ssoService.decodificarToken(token)
                    .then(decoded => {
                        if(this._ssoService.possuiPermissaoParaOMonitrip(decoded)){
                            req.idCliente = decoded.idCliente;
                            next();
                        }
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

        _recursoLiberado(req){
            return this._recursosLiberados.some(recurso => recurso.method == req.method && recurso.path == req.path);
        }
    }
