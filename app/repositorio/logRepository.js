let mongoose = require('mongoose');

module.exports = () =>
    class LogRepository{
        constructor(){
            this._log = mongoose.model('Log');
        }

    obterLogs(clienteId, idLog, placaVeiculo, dataIni, dataFim){
        let criteria = {
            "idCliente" : clienteId,
            "placaVeiculo" : placaVeiculo.toUpperCase(),
            $and: [ { "dataHoraEvento": { $gte: dataIni } }, 
                    { "dataHoraEvento": { $lte: dataFim } } ]
        };

        if(idLog || idLog === 0)
            criteria.idLog = idLog;

        let fields = {"_class":0, "_id":0};    

        return this.prepareResult(criteria, fields);
    }

    prepareResult(criteria, fields){
        return this._log.find(criteria, fields).lean().exec();
    }
}