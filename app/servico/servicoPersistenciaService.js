const safira = require('safira');
let amqpConfig =  safira.bean('config').amqp

class ServicoPersistenciaService{
    constructor(amqpUtil,logDTO,dateUtil,config){
        this._amqpUtil = amqpUtil;
        this._logDTO = logDTO;
        this._dateUtil = dateUtil;
        this._config = config
        this._rabbitConfig = {
            durable:true,
            contentType: 'application/json',
            persistent: true,
            contentEncoding: 'utf-8', 
            headers: {
                action:"insert",
                collection: "logsMonitrip", 
                database: this._config.lazypersistence.database
            }
        };          
    }

    salvarLog(log, infoCliente){
        log.appVersion = infoCliente.appVersion
        log.dataCriacao = this._dateUtil.aplicaTimeZoneEmUTC(new Date(),infoCliente.gmt);
        if(log.idLog < 250)
            return this._amqpUtil
                        .enviarMensagem(log,this._rabbitConfig);
        else
            return new Promise((resolve,reject) => resolve());
    }
}

safira.define(ServicoPersistenciaService);
