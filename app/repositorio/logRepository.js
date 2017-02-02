module.exports = () =>
    class LogRepository{
        constructor(){
            this._log = mongoose.model('Log');
        }

    obterLogs(clienteId, idLog, placaVeiculo, dataIni, dataFim ){
        let criteria = {};

        if(clienteId && !numero && !dataAtualizacao)
            criteria.clienteId = clienteId;
                
        if(dataAtualizacao)
            criteria.atualizacao = {"$gte": new Date(dataAtualizacao)};

        if(numero)
            criteria.numero = numero;

        criteria["tags.NAME"] = {"$in":["FRETADA","REGULAR","ALIMENTADORA"]};

        return this.prepareResult(criteria,{numero:1,descr:1,"trajetos.nome":1,"trajetos.sentido":1,"tags.NAME":1,"_id":0})
    }

    prepareResult(criteria, fields){
        return this._log.find(criteria, fields).lean().exec();
    }
}
