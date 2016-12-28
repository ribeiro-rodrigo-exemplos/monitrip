class DispositivoController{
    constructor(app){
        this._dispositivoService = app.servico.dispositivoService;
        this._ssoService = app.servico.ssoService;
    }

    cadastrar(req,res,next){

        let erros = this._validarDispositivo(req);

        if(erros){
            res.status(422)
                .json(erros);
            return;
        }

        this._ssoService.autenticar(req.body.credenciais)
                            .then(authResult => this._ssoService.decodificarToken(authResult.IdentificacaoLogin))
                            .then(decoded => this._dispositivoService.cadastrar(req.body.dispositivo,decoded.idCliente))
                            .then(() => res.sendStatus(200))
                            .catch(erro => next(erro));

    }

    _validarDispositivo(req){
        delete req.body.dispositivo.excluido;
        delete req.body.dispositivo.id;

        req.assert('dispositivo.imei', 'imei obrigatório').notEmpty();
        req.assert('dispositivo.descricao', 'descrição é obrigatória').notEmpty();
        req.assert('credenciais.usuario','nome de usuário é obrigatório').notEmpty();
        req.assert('credenciais.senha','senha é obrigatória').notEmpty();
        return req.validationErrors(); 
    } 
}

module.exports = app => new DispositivoController(app);

