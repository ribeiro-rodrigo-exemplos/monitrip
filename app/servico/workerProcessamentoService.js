let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class WorkerProcessamentoService{
        constructor(amqpUtil){
            this._amqpUtil = amqpUtil;
            this._queue = amqpConfig['worker-processamento']['queue'];
            this._queueConfig = {
                durable: true,
                deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
            };  
        }

        salvarLog(log){
            return this._amqpUtil.enviarMensagem(log,this._queue,this._queueConfig);
        }
    }

