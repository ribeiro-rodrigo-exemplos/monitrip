const safira = require('safira');

class BilheteController {
    constructor(bilheteRepository, logger,envelopeDTO) {
        this._bilheteRepository = bilheteRepository;
        this._envelopeDTO = envelopeDTO;
        this._logger = logger;
    }

    obterBilhetes(req, res, next) {

        const erros = this._validarParametrosDeConsulta(req);

        if (erros) {
            res.status(400);
            res.json(erros);
            return;
        }

        const dataHoraInicioViagem = req.query.dataHoraInicioViagem;

        const numeroBilhete = req.query.numero;
        const identificacaoLinha = req.query.identificacaoLinha;

        this._logger.info(`BilheteController - obterBilhetes - idCliente: ${req.idCliente} - dataHoraInicioViagem: ${dataHoraInicioViagem} - numeroBilhete: ${numeroBilhete} - identificacaoLinha: ${identificacaoLinha}`);

        this._bilheteRepository
            .filtrarBilhetes(numeroBilhete, dataHoraInicioViagem, identificacaoLinha, req.idCliente)
            .then(bilhetes => bilhetes.length ? res.json(this._envelopeDTO.toDTO(bilhetes, 'bilhetes')) : res.sendStatus(204))
            .catch(erro => next(erro));
    }

    _validarParametrosDeConsulta(req) {
        
        if (req.query.dataHoraInicioViagem)
            req.checkQuery('dataHoraInicioViagem', 'deve estar no formato ISO').isDateTime();
        
        req.checkQuery('identificacaoLinha','campo obrigatório').notEmpty();

        return req.validationErrors();
    }
};

safira.define(BilheteController);