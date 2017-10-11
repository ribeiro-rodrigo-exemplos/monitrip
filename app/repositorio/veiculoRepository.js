const safira = require('safira');

class VeiculoRepository {

    constructor(veiculo, logger) {
        this._Veiculo = veiculo;
        this._logger = logger;
    }

    filtrarVeiculos(idCliente, placa, dataAtualizacao) {

        let filtro = {};

        if (idCliente && !placa && !dataAtualizacao)
            filtro["id_cliente"] = idCliente;

        if (dataAtualizacao)
            filtro["dt_atualizacao"] = {$gte: dataAtualizacao};

        if (placa)
            filtro["vl_placa"] = placa;

        this._logger.info(`VeiculoRepository - filtrarVeiculos - idCliente: ${idCliente} - placa: ${placa} - dataAtualizacao: ${dataAtualizacao}`);

        return new Promise((resolve, reject) => {
            this._Veiculo.findAll({where: filtro, attributes: ['vl_placa', 'fl_ativo']})
                .then(result => resolve(result.length ? result : null))
                .catch(erro => reject(erro))
        });
    }
};

safira.define(VeiculoRepository);