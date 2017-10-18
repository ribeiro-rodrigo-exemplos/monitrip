const safira = require('safira');

class MotoristaController{
    constructor(motoristaRepository,validadorDeData,logger,envelopeDTO){
        this._motoristaRepository = motoristaRepository;
        this._validadorDeData = validadorDeData;
        this._envelopeDTO = envelopeDTO;
        this._logger = logger;
    }

    obter(req,res,next){
        
        let cpf = req.query.cpf;
        let dataAtualizacao = req.query.dataAtualizacao;
        
        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._logger.info(`MotoristaController - obter  - cpf: ${cpf} - dataAtualizacao: ${dataAtualizacao}`);

        this._motoristaRepository
                .filtrarMotoristas(req.idCliente,cpf,dataAtualizacao)
                    .then(data => {
                        if(!data){
                            res.sendStatus(204);
                            return;
                        }
                        
                        res.json(this._envelopeDTO.toDTO(data,'motoristas'));
                    })
                    .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validarDataEHora(dataAtualizacao);
    }
};

safira.define(MotoristaController);
