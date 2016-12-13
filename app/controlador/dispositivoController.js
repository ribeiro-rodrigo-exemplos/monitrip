class DispositivoController{
    constructor(app){
        this._MysqlConnectionFactory = app.database.mysqlConnectionFactory;
        this._DispositivoRepository = app.repositorio.dispositivoRepository;
    }

    cadastrar(req,res,next){
        
        let erros = this._validarDispositivo(req);

        if(erros){
            res.status(422)
                .json(erros);
            return;
        }
        
        let connection = new this._MysqlConnectionFactory();
        let dispositivoRepository = new this._DispositivoRepository(connection);

        let licenca = 35;
        let cliente = 209;

        let objetoDispositivo = {
            imei: req.body.imei,
            descricao: req.body.descricao,
            excluido: req.body.excluido
        };

        Promise.all([
            dispositivoRepository.consultarImei(cliente, objetoDispositivo.imei, licenca),
            dispositivoRepository.verificaLicenca(cliente, licenca)
        ]).then(imei => {
            dispositivoRepository.cadastrar(objetoDispositivo, licenca, cliente)
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

