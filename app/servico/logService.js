const safira = require('safira');
let amqp = require('amqplib/callback_api');

let amqpConfig =  safira.bean('config').amqp;

class LogService {
    constructor(dateUtil,bilheteService,servicoPersistenciaService,viagemAdapter,logRepository,bilheteRepository,constantes,logger) {
        this._dateUtil = dateUtil;
        this._bilheteService = bilheteService; 
        this._servicoPersistenciaService = servicoPersistenciaService;
        this._viagemAdapter = viagemAdapter;
        this._logRepository = logRepository;  
        this._bilheteRepository = bilheteRepository;
        this._logger = logger;
        this._constantes = constantes; 
    }

    salvar(log,infoCliente) {

        let logServicoPersistencia = this._clone(log);
        let eventoViagem = this._clone(log); 
        
        return this._viagemAdapter
                    .registrarEvento(eventoViagem,infoCliente)
                    .then(() => this._servicoPersistenciaService.salvarLog(logServicoPersistencia))
                    .then(() => this._bilheteService.ehLeituraDeBilhete(log) ? this._bilheteService.registrarCheckin(log) : null) 
    }

    buscarLogs(idCliente, dataInicio, dataFim, idLog, placaVeiculo, gmtCliente){

        let objetoRetorno = {};

        this._logger.info(`LogService - buscarLogs - idCliente: ${idCliente} - idLog: ${idLog} - dataInicial: ${dataInicio} - dataFim: ${dataFim} - placaVeiculo: ${placaVeiculo} - gmtCliente: ${gmtCliente}`);

        return new Promise((resolve, reject) =>{

            if(idLog == this._constantes.log.BILHETE && placaVeiculo == null){
                
                this._bilheteRepository.filtrarBilhetesVendidosNoPeriodo(idCliente, dataInicio, dataFim)
                    .then(result =>{
                        objetoRetorno.logs = result;

                        objetoRetorno.logs.map(item => {
                            item.evento = this._constantes.descLogs[item.idLog];     
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
                            item.evento = this._constantes.descLogs[item.idLog];     
                            item.dataHoraFormatada = this._dateUtil.formataDataHora(item.dataHoraEvento, gmtCliente);
                        });
                        
                    }).then(() => {
                        resolve(objetoRetorno.logs);
                    }).catch(erro => reject(erro));
            
            }else if(idLog != this._constantes.log.BILHETE && placaVeiculo != null){
            
                this._logRepository.obterLogs(idCliente, idLog, placaVeiculo, dataInicio, dataFim)
                    .then(result =>{
                        objetoRetorno.logs = result;

                        objetoRetorno.logs.map(item => {
                            item.evento = this._constantes.descLogs[item.idLog];     
                            item.dataHoraFormatada = this._dateUtil.formataDataHora(item.dataHoraEvento, gmtCliente);
                        });

                        resolve(objetoRetorno.logs);

                    }).catch(erro => reject(erro));

            }else{
                resolve(null);
            }

        });
    }

    _clone(log){
        return Object.assign({},log);
    }
    
}

safira.define(LogService);
