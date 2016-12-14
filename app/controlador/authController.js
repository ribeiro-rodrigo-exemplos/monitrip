class AuthController{
    constructor(app){
        this._ssoService = app.servico.ssoService;
    }

    autenticar(req,res,next){
        let erros = this._validarDados(req);

        if(erros){
            res.status(422)
                .json(erros);
            return;
        }

        let credenciais = req.body;

        this._ssoService.autenticar(credenciais)
                            .then(authResult =>{
                                
                            })
                            .catch(erro => {

                            });

        res.sendStatus(200);
    }   

    _validarDados(req){
        req.assert('login','O campo login é obrigatório').notEmpty();
        req.assert('senha','O campo senha é obrigatório').notEmpty();
        req.assert('imei','O campo imei é obrigatório').notEmpty();

        return req.validationErrors();
    }
}

module.exports = app => new AuthController(app);