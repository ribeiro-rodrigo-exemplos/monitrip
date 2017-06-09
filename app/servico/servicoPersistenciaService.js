let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class ServicoPersistenciaService{
        constructor(logService,servicoPersistenciaDTO){
            this._logService = logService;
            this._servicoPersistenciaDTO = servicoPersistenciaDTO;
            this._queue = amqpConfig['servico-persistencia'];
            this._rabbitConfig = {durable:true}; 
        }

        salvarLog(log){

            if(log.idLog < 250)
                return this._logService.salvar(this._servicoPersistenciaDTO.toDTO('logsMonitrip', 'insert', log),this._queue,this._rabbitConfig);
            else
                return new Promise((resolve,reject) => resolve());
        }
    }