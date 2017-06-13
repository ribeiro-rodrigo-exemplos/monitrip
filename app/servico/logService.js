let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(dateUtil,bilheteService,servicoPersistenciaService,workerProcessamentoService) {
            this._dateUtil = dateUtil;
            this._bilheteService = bilheteService; 
            this._servicoPersistenciaService = servicoPersistenciaService;
            this._workerProcessamentoService = workerProcessamentoService;  
        }

        salvar(log) {
            log.dataHoraEvento = this._dateUtil.formatarParaIsoDate(log.dataHoraEvento);

            let promises = [
                this._workerProcessamentoService.salvarLog(log),
                this._servicoPersistenciaService.salvarLog(log)
            ]; 

            if(this._bilheteService.ehLeituraDeBilhete(log))
                promises.push(this._bilheteService.registrarCheckin(log));

            return Promise.all(promises);
        }
    };
