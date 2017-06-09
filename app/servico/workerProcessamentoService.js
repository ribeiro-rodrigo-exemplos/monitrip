let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class WorkerProcessamentoService{
        constructor(logService){
            this._logService = logService;
            this._queue = amqpConfig['worker-processamento']['queue'];
            this._queueConfig = {
                durable: true,
                deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
            };  
        }

        salvarLog(log){   
            return this._logService.salvar(log,this._queue,this._queueConfig);
        }
    }

