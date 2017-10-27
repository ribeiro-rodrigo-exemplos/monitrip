const safira = require('safira');

class PontoController {
    constructor(servicoApiService, logger) {
        this._servicoApiService = servicoApiService;
        this._logger = logger;
    }
    
    obterPontos(req, res, next) {
     
        this._logger.info(`PontoController - obterPontos`);
        
        this._servicoApiService.buscarPontos()
            .then(pontos => res.json(pontos))
            .catch(erro => next(erro));
    }
};

safira.define(PontoController);