let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class WorkerProcessamentoService{
        constructor(amqpUtil,dateUtil){
            this._amqpUtil = amqpUtil;
            this._dateUtil = dateUtil; 
            this._queue = amqpConfig['worker-processamento']['queue'];
            this._queueConfig = {
                durable: true,
                deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
            };  
        }

        salvarLog(log,infoCliente){

            log.dataHoraEventoUTC = log.dataHoraEvento; 
            log.dataHoraEvento = this._dateUtil.aplicaTimeZoneEmUTC(log.dataHoraEvento,infoCliente.gmt);
            log.cpfMotorista = infoCliente.cpfMotorista; 

            if(log.idJornada)
                return this._amqpUtil.enviarMensagem(log,this._queue,this._queueConfig);
        }
    }

