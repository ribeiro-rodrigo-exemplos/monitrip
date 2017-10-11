const safira = require('safira');

class LogRepository {
    constructor(logger, log) {
        this._log = log;
        this._logger = logger;
    }

    obterLogs(clienteId, idLog, placaVeiculo, dataIni, dataFim) {

        let criteria = {};

        if(idLog){
            criteria["idLog"] = idLog;
        }

        if(placaVeiculo){
            criteria["placaVeiculo"] = placaVeiculo;
        }

        criteria["idCliente"] = clienteId;
        criteria["$and"] = [{"dataHoraEvento": {$gte: dataIni}}, {"dataHoraEvento": {$lte: dataFim}}];

        this._logger.info(`LogRepository - obterLogs - idCliente: ${clienteId} - idLog: ${idLog} - placaVeiculo: ${placaVeiculo} - dataIni: ${dataIni} - dataFim: ${dataFim}`);

            return this._prepareResult(criteria);
    }
            
    _prepareResult(criteria) {
        return this._log.find(criteria, {"_class": 0, "_id": 0}).lean().exec();
    }
};

safira.define(LogRepository);