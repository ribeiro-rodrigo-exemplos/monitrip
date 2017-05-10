let mongoose = require('mongoose');
const logger = require('../util/log');

module.exports = () =>
    class LogRepository {
        constructor() {
            this._log = mongoose.model('Log');
            this._logBilhete = mongoose.model('Bilhete');
        }



        obterLogs(clienteId, idLog, placaVeiculo, dataIni, dataFim) {
            let filtro = {};

            filtro = this.preparaConsulta(clienteId, idLog, placaVeiculo, dataIni, dataFim);

            logger.info(`LogRepository - obterLogs - idCliente: ${clienteId} - idLog: ${idLog} - placaVeiculo: ${placaVeiculo} - dataIni: ${dataIni} - dataFim: ${dataFim}`);

             return this.prepareResult(filtro, this._log);
        }



        obterLogsBilhete(clienteId, idLog, placaVeiculo, dataIni, dataFim) {
            let filtro = {};

            filtro = this.preparaConsulta(clienteId, idLog, null, dataIni, dataFim);

            logger.info(`LogRepository - obterLogsBilhete - idCliente: ${clienteId} - idLog: ${idLog} - placaVeiculo: ${placaVeiculo} - dataIni: ${dataIni} - dataFim: ${dataFim}`);

            return this.prepareResult(filtro, this._logBilhete);
        }



        preparaConsulta(clienteId, idLog, placaVeiculo, dataIni, dataFim){
            let criteria = {};
            
            if (placaVeiculo){
                criteria = {
                    "idCliente": clienteId,
                    "placaVeiculo": placaVeiculo.toUpperCase(),
                    $and: [{"dataHoraEvento": {$gte: dataIni}},
                        {"dataHoraEvento": {$lte: dataFim}}]
                };
            }else{
                criteria = {
                    "clienteId": clienteId,
                    $and: [{"dataHoraEvento": {$gte: dataIni}},
                        {"dataHoraEvento": {$lte: dataFim}}]
                };
            }


            if (idLog || idLog === 0)
                criteria.idLog = idLog;

            let fields = {"_class": 0, "_id": 0};

            return {criteria: criteria, fields: fields};
        }

        
        prepareResult(filtro, model) {
            return model.find(filtro.criteria, filtro.fields).lean().exec();
        }
    };