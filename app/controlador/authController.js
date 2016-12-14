class AuthController{
    constructor(app){
        this._ssoService = app.servico.ssoService;
        this._DispositivoRepository = app.repositorio.dispositivoRepository;
        this._MysqlConnectionFactory = app.database.mysqlConnectionFactory
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
                                this._ssoService.decodificarToken(authResult.IdentificacaoLogin)
                                        .then(decoded => {
                                            if(!this._ssoService.possuiPermissaoParaOMonitrip(decoded)){
                                                this._sendError('O dispositivo não possui permissão para consumir os serviços do Monitrip',401,next);
                                                return;
                                            }

                                            let connection = new this._MysqlConnectionFactory();
                                            let dispositivoRepository = new this._DispositivoRepository(connection);

                                            dispositivoRepository.obterDispositivoPorImei(decoded.idCliente,credenciais.imei)
                                                                    .then(dispositivo => {
                                                                        if(dispositivo)
                                                                            res.json(authResult);
                                                                        else
                                                                            this._sendError('O imei informado não existe ou o dispositivo não possui permissão para se autenticar com o mesmo.',401,next);
                                                                    })
                                                                    .catch(erro => next(erro));
                                            connection.end();
                                        }); 
                            })
                            .catch(erro => {
                                next(erro);
                            });
    }

    _validarDados(req){
        req.assert('usuario','O campo usuario é obrigatório').notEmpty();
        req.assert('senha','O campo senha é obrigatório').notEmpty();
        req.assert('imei','O campo imei é obrigatório').notEmpty();

        return req.validationErrors();
    }

    _sendError(mensagem,status,next){
        let error = new Error(mensagem);
        error.status = 401;
        next(error);
    }
}

module.exports = app => new AuthController(app);