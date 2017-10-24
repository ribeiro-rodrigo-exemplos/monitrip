const safira = require('safira');

class ServicoController{
    constructor(servicoRepository, logger,envelopeDTO){
        this._servicoRepository = servicoRepository;
        this._envelopeDTO = envelopeDTO;
        this._logger = logger;
    }

    obter(req, res, next) {

        const dataInicio = req.query.dataInicio;
        const dataFim = req.query.dataFim;

        this._logger.info(`ServicoController - obter ${req.idCliente} de ${dataInicio} a ${dataFim}`);

        const erros = this._validarParametrosDeConsulta(req);

        if (erros) {
            res.status(400);
            res.json(erros);
            return;
        }

        this._servicoRepository
            .obterServicos(req.idCliente, dataInicio, dataFim)
            .then(servicos => {
                this._logger.info(`ServicoController - obter ${req.idCliente} de ${dataInicio} a ${dataFim} - sucesso`);
                servicos.length ? res.json(this._envelopeDTO.toDTO(servicos,'servicos')) : res.sendStatus(204)
            })
            .catch(erro => next(erro));
    }

    _validarParametrosDeConsulta(req) {
        this._logger.info(`ServicoController - _validarParametrosDeConsulta ${req.idCliente}`);

        req.checkQuery('dataInicio', 'parametro obrigatório').notEmpty();
        req.checkQuery('dataFim', 'parametro obrigatório').notEmpty();
        req.checkQuery('dataInicio', 'deve estar no formato ISO').isDate();
        req.checkQuery('dataFim', 'deve estar no formato ISO').isDate();

        return req.validationErrors();
    }
};

safira.define(ServicoController);