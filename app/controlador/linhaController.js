const safira = require('safira');

class LinhaController {
    constructor(servicoApiService, logger) {
        this._servicoApiService = servicoApiService;
        this._logger = logger;
    }
    
    obterLinhas(req, res, next) {
        
        let idCliente = req.params.idCliente;
        
        this._logger.info(`LinhaController - obterLinhas  - idCliente: ${idCliente}`);

        this._servicoApiService.buscarLinhas(idCliente)
            .then(linhas => res.json(linhas))
            .catch(erro => next(erro));
    }
};

safira.define(LinhaController);