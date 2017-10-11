const safira = require('safira');

class LinhaController{
    constructor(linhaRepository,validadorDeData,logger,envelopeDTO){
        this._LinhaRepository = linhaRepository;
        this._validadorDeData = validadorDeData;
        this._envelopeDTO = envelopeDTO;
        this._logger = logger;
    }

    obter(req,res,next){
        let numero = req.query.numero; 
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._logger.info(`LinhaController - obter  - numero: ${req.query.numero} - dataAtualizacao: ${req.query.dataAtualizacao}`);

        this._LinhaRepository
                .filtrarLinhas(req.idCliente,numero,dataAtualizacao)
                    .then(linhas =>
                        linhas.map(linha => {
                            if(linha.tags)
                                linha.tipo = linha.tags.some(trajeto => trajeto.NAME == "FRETADA") ? "FRETADA" : "REGULAR";

                            delete linha.tags;
                            return linha;
                        })
                    )
                    .then(linhas => {
                        if(linhas.length){
                            linhas = this._envelopeDTO.toDTO(linhas,'linhas');
                            res.json(linhas);  
                        }
                        else
                            res.sendStatus(204);
                    })
                    .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validarDataEHora(dataAtualizacao);
    }
};

safira.define(LinhaController);
