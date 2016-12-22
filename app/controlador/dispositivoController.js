class DispositivoController{
    constructor(app){
        this._MysqlConnectionFactory = app.database.mysqlConnectionFactory;
        this._DispositivoRepository = app.repositorio.dispositivoRepository;
        this._SsoMysqlConnectionFactory = app.database.ssoMysqlConnectionFactory
    }

    cadastrar(req,res,next){
        
        let erros = this._validarDispositivo(req);

        if(erros){
            res.status(422)
                .json(erros);
            return;
        }
        
        let connection_zn4 = new this._MysqlConnectionFactory();
        let connection_sso = new this._SsoMysqlConnectionFactory();

        let dispositivoRepository = new this._DispositivoRepository(connection_zn4, connection_sso);
        
        let cliente = req.idCliente;
        
        let objetoDispositivo = {
            imei: req.body.imei,
            descricao: req.body.descricao,
            excluido: req.body.excluido
        };

        Promise.all([
            dispositivoRepository.consultarImei(cliente, objetoDispositivo.imei),
            dispositivoRepository.verificaLicenca(cliente)
        ]).then(imei => {
            dispositivoRepository.cadastrar(objetoDispositivo, cliente)
                .then(dispositivo => res.sendStatus(200));
            
        }).catch(erro =>{
            
            if(erro.msg)
                res.status(422) 
                    .send(erro);
            else
                next(erro);
        });
    }

    _validarDispositivo(req){
        req.assert('imei', 'imei obrigatório').notEmpty();
        req.assert('descricao', 'descrição é obrigatória').notEmpty();
        return req.validationErrors();
    }
}

module.exports = app => new DispositivoController(app);

