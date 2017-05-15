let mongoose = require('mongoose');
const logger = require('../util/log');

module.exports = () =>
    class LogRepository {
        constructor() {
            this._log = mongoose.model('Log');
        }

        obterLogs(clienteId, idLog, placaVeiculo, dataIni, dataFim) {
            let criteria = {
                "idCliente": clienteId,
                "placaVeiculo": placaVeiculo.toUpperCase(),
                $and: [{"dataHoraEvento": {$gte: dataIni}},
                    {"dataHoraEvento": {$lte: dataFim}}]
            };

            logger.info(`LogRepository - obterLogs - idCliente: ${clienteId} - idLog: ${idLog} - placaVeiculo: ${placaVeiculo} - dataIni: ${dataIni} - dataFim: ${dataFim}`);

             return this._prepareResult(criteria);
        }
                
        _prepareResult(criteria) {
            return this._log.find(criteria, {"_class": 0, "_id": 0}).lean().exec();
        }
    };
