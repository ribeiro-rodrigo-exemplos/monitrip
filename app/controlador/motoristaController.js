let moment = require('moment');

class MotoristaController{
    constructor(app){
        this._MysqlConnectionFactory = app.database.mysqlConnectionFactory;
        this._MotoristaRepository = app.repositorio.motoristaRepository;
        this._validadorDeData = app.util.validadorDeData;
        this._GenericDTO = app.util.dto.genericDTO;
    }

    obter(req,res,next){
        
        let cpf = req.query.cpf;
        let dataAtualizacao = req.query.dataAtualizacao;
        let cliente = req.idCliente;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        let connection = new this._MysqlConnectionFactory();
        let motoristaRepository = new this._MotoristaRepository(connection);

        motoristaRepository
                .filtrarMotoristas(this.cliente,cpf,dataAtualizacao)
                    .then(data => {
                        if(!data){
                            res.sendStatus(204);
                            return;
                        }
                        
                        

                        res.json(new this._GenericDTO(data,'motoristas'));
                    })
                    .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = app => new MotoristaController(app); 

