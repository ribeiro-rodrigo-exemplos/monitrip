let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
let util = require('../util/util')();
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(dateUtil,bilheteService,servicoPersistenciaService,workerProcessamentoService,logRepository,bilheteRepository) {
            this._dateUtil = dateUtil;
            this._bilheteService = bilheteService; 
            this._servicoPersistenciaService = servicoPersistenciaService;
            this._workerProcessamentoService = workerProcessamentoService;
            this._logRepository = logRepository;  
            this._bilheteRepository = bilheteRepository;
        }

        salvar(log,infoCliente) {
            
            let promises = [
                this._workerProcessamentoService.salvarLog(log,infoCliente),
                this._servicoPersistenciaService.salvarLog(log)
            ]; 

            if(this._bilheteService.ehLeituraDeBilhete(log))
                promises.push(this._bilheteService.registrarCheckin(log));

            return Promise.all(promises);
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
        
    }
