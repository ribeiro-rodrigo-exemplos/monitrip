let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class ServicoPersistenciaService{
        constructor(amqpUtil,servicoPersistenciaDTO,dateUtil){
            this._amqpUtil = amqpUtil;
            this._dateUtil = dateUtil;
            this._servicoPersistenciaDTO = servicoPersistenciaDTO;
            this._queue = amqpConfig['servico-persistencia'];
            this._rabbitConfig = {durable:true}; 
        }

        salvarLog(log){

            log.dataHoraEvento = this._dateUtil.formatarParaIsoDate(log.dataHoraEvento);

            if(log.idLog < 250)
                return this._amqpUtil
                            .enviarMensagem(this._servicoPersistenciaDTO.toDTO('logsMonitrip', 'insert', log),
                                this._queue,this._rabbitConfig);
            else
                return new Promise((resolve,reject) => resolve());
        }
    }