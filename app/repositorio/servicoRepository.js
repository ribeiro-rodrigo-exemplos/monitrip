const safira = require('safira');

class ServicoRepository {
    constructor(logger, servico) {
        this._Servico = servico;
        this._logger = logger;
    }

    obterServicos(clienteId, dataInicial, dataFinal) {

        this._logger.info(`ServicoRepository - obterServicos(${clienteId},${dataInicial},${dataFinal})`);

        let criteria = {
            idCliente: clienteId,
            dataServico: {
                "$gte": dataInicial,
                "$lte": dataFinal
            }
        };

        return this._Servico.find(criteria, {"_id": 0,"_class":0});
    }
};

safira.define(ServicoRepository);