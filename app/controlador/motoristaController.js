let moment = require('moment');

class MotoristaController{
    constructor(app){
        this._motoristaRepository = app.repositorio.motoristaRepository;
        this._validadorDeData = app.util.validadorDeData;

        this._RetornoDTO = app.util.dto.retornoDTO;
        this._cliente = 209;

    }

    obter(req,res,next){
        
        let cpf = req.query.cpf;
        let dataAtualizacao = req.query.dataAtualizacao;
        let cliente = req.idCliente;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._motoristaRepository
                .filtrarMotoristas(this._cliente,cpf,dataAtualizacao)
                    .then(data => {
                        if(!data){
                            res.sendStatus(204);
                            return;
                        }
                        
                        res.json(new this._RetornoDTO(data,'motoristas'));
                    })
                    .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = app => new MotoristaController(app); 

