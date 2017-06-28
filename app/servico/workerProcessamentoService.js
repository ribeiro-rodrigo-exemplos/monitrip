let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () => 
    class WorkerProcessamentoService{
        constructor(amqpUtil,dateUtil){
            this._amqpUtil = amqpUtil;
            this._dateUtil = dateUtil; 
            this._queue = amqpConfig['worker-processamento']['queue'];
            this._queueConfig = {
                durable: true,
                maxPriority:10,
                deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
            };

            this._prioridadesDosLogs = {
                '4':log => 1, 
                '5':log => log.tipoRegistroEvento == 1 ? 9 : 7,
                '6':log => 6, 
                '7':log => log.tipoRegistroViagem == 1 ? 10 : 8,
                '8':log => log.tipoRegistroViagem == 1 ? 10 : 8,
                '9':log => 6 

            }  
        }

        salvarLog(log,infoCliente){

            log.dataHoraEventoUTC = log.dataHoraEvento; 
            log.dataHoraEvento = this._dateUtil.aplicaTimeZoneEmUTC(log.dataHoraEvento,infoCliente.gmt);
            log.cpfMotorista = infoCliente.cpfMotorista; 

            let mensagemOption = {
                priority:this._obterPrioridadeDoLog(log) 
            }; 

            if(log.idJornada)
                return this._amqpUtil.enviarMensagem(log,this._queue,this._queueConfig,mensagemOption);
        }

        _obterPrioridadeDoLog(log){
            let prioridadeStrategy = this._prioridadesDosLogs[log.idLog]; 
            return prioridadeStrategy ? prioridadeStrategy(log) : 1 
        }
    }

