const safira = require('safira');

class LicencaService {
    constructor(dispositivoRepository, clienteRepository, logger) {
        this._dispositivoRepository = dispositivoRepository;
        this._clienteRepository = clienteRepository;
        this._logger = logger;
    }

    obterLicencasDoCliente(idCliente) {

        let licencas = {};

        this._logger.info(`LicencaService - obterLicencasDoCliente - idCliente: ${idCliente}`);

        return this._dispositivoRepository
            .obterQuantidadeDeDispositivosAtivosDoCliente(idCliente)
            .then(quantidade => licencas.usadas = quantidade)
            .then(() => this._clienteRepository.obterQuantidadeMaximaDeLicencasDoCliente(idCliente))
            .then(quantidadeMaxima => licencas.disponiveis = quantidadeMaxima >= licencas.usadas ? quantidadeMaxima - licencas.usadas : quantidadeMaxima)
            .then(() => licencas);
    }
};

safira.define(LicencaService);