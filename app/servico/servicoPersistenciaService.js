const safira = require('safira');
let amqpConfig =  safira.bean('config').amqp

class ServicoPersistenciaService{
    constructor(amqpUtil,logDTO,dateUtil){
        this._amqpUtil = amqpUtil;
        this._logDTO = logDTO;
        this._dateUtil = dateUtil;
        this._queue = amqpConfig['servico-persistencia'];
        this._rabbitConfig = {
            durable:true,
            contentType: 'text/plain',
            persistent: true,
            contentEncoding: 'utf-8'
        };          
    }

    salvarLog(log, infoCliente){
        
        log.appVersion = infoCliente.appVersion
        log.dataCriacao = this._dateUtil.aplicaTimeZoneEmUTC(new Date(),infoCliente.gmt);
        if(log.idLog < 250)
            return this._amqpUtil
                        .enviarMensagem(this._logDTO.toDTO('logsMonitrip', 'insert', log),
                            this._queue,this._rabbitConfig);
        else
            return new Promise((resolve,reject) => resolve());
    }
}

safira.define(ServicoPersistenciaService);
