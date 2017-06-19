let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
let util = require('../util/util')();
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(logDTO,dateUtil,logRepository,bilheteRepository) {
            this._LogDTO = logDTO;
            this._dateUtil = dateUtil;
            this._logRepository = logRepository;
            this._bilheteRepository = bilheteRepository;
        }

        salvar(log) {
            return new Promise((resolve, reject) => {
                amqp.connect(amqpConfig.url, (erro, connection) => {

                    if (erro) {
                        reject(erro);
                        return;
                    }

                    connection.createChannel((err, channel) => {

                        if (err)
                            reject(err);

                        let servicoPersistenciaQueue = amqpConfig['servico-persistencia'];
                        let workerProcessamentoQueue = amqpConfig['worker-processamento']['queue'];

                        this._enviarMensagem(channel,servicoPersistenciaQueue,
                            this._converterMensagem(this._LogDTO.toDTO('logsMonitrip', 'insert', log)),
                            {durable: true});

                        log.dataHoraEvento = this._dateUtil.formatarParaIsoDate(log.dataHoraEvento);

                        this._enviarMensagem(channel,workerProcessamentoQueue,this._converterMensagem(log),{
                            durable: true,
                            deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                            deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
                        });

                        this._fechar(connection);

                        resolve();
                    });
                });
            });
        }

        
        buscarLogs(idCliente, dataInicio, dataFim, idLog, placaVeiculo, gmtCliente){

            let objetoRetorno={};

            logger.info(`LogService - buscarLogs - idCliente: ${idCliente} - idLog: ${idLog} - dataInicial: ${dataInicio} - dataFim: ${dataFim} - placaVeiculo: ${placaVeiculo} - gmtCliente: ${gmtCliente}`);

            return new Promise((resolve, reject) =>{

                if(idLog == util.log.BILHETE && placaVeiculo == null){
                    
                    this._bilheteRepository.filtrarBilhetesVendidosNoPeriodo(idCliente, dataInicio, dataFim)
                        .then(result =>{
                            objetoRetorno.logs = result;

                            objetoRetorno.logs.map(item => {
                                item.evento = util.descLogs[item.idLog];     
                                item.dataHoraFormatada = this._dateUtil.formataDataHora(item.dataHoraEvento, gmtCliente);
                            });

                            resolve(objetoRetorno.logs);
                        }).catch(erro => reject(erro));

                }else if(idLog == null && placaVeiculo == null){

                    let promises = [
                        this._logRepository.obterLogs(idCliente, idLog, placaVeiculo, dataInicio, dataFim),
                        this._bilheteRepository.filtrarBilhetesVendidosNoPeriodo(idCliente, dataInicio, dataFim)
                    ];
                    
                    Promise.all(promises)
                        .then(result => {
                            objetoRetorno.logs = result[0];
                            objetoRetorno.logsBilhete = result[1];

                            objetoRetorno.logsBilhete.forEach(item => {
                                objetoRetorno.logs.push(item);
                            });

                            objetoRetorno.logs.map(item => {
                                item.evento = util.descLogs[item.idLog];     
                                item.dataHoraFormatada = this._dateUtil.formataDataHora(item.dataHoraEvento, gmtCliente);
                            });
                            
                        }).then(() => {
                            resolve(objetoRetorno.logs);
                        }).catch(erro => reject(erro));
                
                }else if(idLog != util.log.BILHETE && placaVeiculo != null){
                
                    this._logRepository.obterLogs(idCliente, idLog, placaVeiculo, dataInicio, dataFim)
                        .then(result =>{
                            objetoRetorno.logs = result;

                            objetoRetorno.logs.map(item => {
                                item.evento = util.descLogs[item.idLog];     
                                item.dataHoraFormatada = this._dateUtil.formataDataHora(item.dataHoraEvento, gmtCliente);
                            });

                            resolve(objetoRetorno.logs);

                        }).catch(erro => reject(erro));

                }else{
                    resolve(null);
                }

            });
        
        }


        _enviarMensagem(channel,queue,mensagem,optionsQueue){
            channel.assertQueue(queue,optionsQueue);
            channel.sendToQueue(queue, Buffer.from(mensagem), {
                persistent: true,
                contentType: 'text/plain',
                contentEncoding: 'utf-8'
            });
        }

        _converterMensagem(log) {
            logger.info(`LogService - _converterMensagem - log: ${log}`);
            return JSON.stringify(log);
        }

        _fechar(connection) {
            setTimeout(() => connection.close(), 500);
        }
    };
