const safira = require('safira');

class LicencaController {
    constructor(licencaService, logger) {
        this._licencaService = licencaService;
        this._logger = logger;
    }

    obterLicencasDoCliente(req, res, next) {
        this._logger.info(`LicencaController - obterLicencasDoCliente  - idCliente: ${req.idCliente}`);
        this._obterLicencas(res, next, req.idCliente);
    }

    obterLicencasDoClientePorId(req, res, next) {
        this._logger.info(`LicencaController - obterLicencasDoClientePorId  - id: ${req.params.id}`);
        this._obterLicencas(res, next, req.params.id);
    }

    _obterLicencas(res, next, id) {
        this._licencaService
            .obterLicencasDoCliente(id)
            .then(licencas => res.json(licencas))
            .catch(erro => next(erro));
    }
};

safira.define(LicencaController);