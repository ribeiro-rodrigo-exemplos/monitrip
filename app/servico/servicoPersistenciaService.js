const safira = require('safira');
let amqpConfig =  safira.bean('config').amqp

class ServicoPersistenciaService{
    constructor(amqpUtil,logDTO){
        this._amqpUtil = amqpUtil;
        this._logDTO = logDTO;
        this._queue = amqpConfig['servico-persistencia'];
        this._rabbitConfig = {
            durable:true,
            contentType: 'text/plain',
            persistent: true,
            contentEncoding: 'utf-8'
        };          
    }

    salvarLog(log){

        if(log.idLog < 250)
            return this._amqpUtil
                        .enviarMensagem(this._logDTO.toDTO('logsMonitrip', 'insert', log),
                            this._queue,this._rabbitConfig);
        else
            return new Promise((resolve,reject) => resolve());
    }
}

safira.define(ServicoPersistenciaService);