/**
 * Created by rodrigo.santos on 05/01/2017.
 */

let logger = require('../util/log');

module.exports = () =>
    class LicencaController {
        constructor(licencaService) {
            this._licencaService = licencaService;
        }

        obterLicencasDoCliente(req, res, next) {
            logger.info(`LicencaController - obterLicencasDoCliente  - idCliente: ${req.idCliente}`);
            this._obterLicencas(res, next, req.idCliente);
        }

        obterLicencasDoClientePorId(req, res, next) {
            logger.info(`LicencaController - obterLicencasDoClientePorId  - id: ${req.params.id}`);
            this._obterLicencas(res, next, req.params.id);
        }

        _obterLicencas(res, next, id) {
            this._licencaService
                .obterLicencasDoCliente(id)
                .then(licencas => res.json(licencas))
                .catch(erro => next(erro));
        }
    };