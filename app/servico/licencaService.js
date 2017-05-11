/**
 * Created by rodrigo.santos on 05/01/2017.
 */

const logger = require('../util/log');

module.exports = () =>
    class LicencaService {
        constructor(dispositivoRepository, clienteRepository) {
            this._dispositivoRepository = dispositivoRepository;
            this._clienteRepository = clienteRepository;
        }

        obterLicencasDoCliente(idCliente) {

            let licencas = {};

            logger.info(`LicencaService - obterLicencasDoCliente - idCliente: ${idCliente}`);

            return this._dispositivoRepository
                .obterQuantidadeDeDispositivosAtivosDoCliente(idCliente)
                .then(quantidade => licencas.usadas = quantidade)
                .then(() => this._clienteRepository.obterQuantidadeMaximaDeLicencasDoCliente(idCliente))
                .then(quantidadeMaxima => licencas.disponiveis = quantidadeMaxima >= licencas.usadas ? quantidadeMaxima - licencas.usadas : quantidadeMaxima)
                .then(() => licencas);
        }
    };