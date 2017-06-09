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

            if(this._novoPeriodoDeViagem(log)){
                
            }

            return this._logService.salvar(log,this._queue,this._queueConfig);
        }

        _novoPeriodoDeViagem(log){
            return log.idJornada && log.idViagem && log.idLog == 5 && log.tipoRegistroEvento == 1;
        }

        _fechamentoDePeriodoDeViagem(log){
            return log.idJornada && log.idViagem && log.idLog == 5 && log.tipoRegistroEvento == 0;
        }

        _criarEventoDeAberturaDePeriodoDeViagem(log){

        }

        _criarEventoDeFechamentoDePeriodoDeViagem(log){

        }
    }

