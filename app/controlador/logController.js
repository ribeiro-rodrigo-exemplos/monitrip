let logger = require('../util/log');
let util = require('../util/util')();

module.exports = () =>
    class LogController{
        constructor(logService, logRepository, bilheteRepository, util, dateUtil){
            this._logService = logService;
            this._LogRepository = logRepository;
            this._bilheteRepository = bilheteRepository;
            this._Util = util;
            this._DateUtil = dateUtil;
        }

        inserirLog(req,res,next){

            req.assert('idLog','Id do log é obrigatório').notEmpty();

            if(this._possuiErrosDeValidacao(req,res))
                return;

            req.body.idCliente = req.idCliente;

            req.body.idViagem = req.header('idViagem');
            req.body.idJornada = req.header('idJornada');

            req.body.placaVeiculo = req.body.placaVeiculo ? req.body.placaVeiculo.toUpperCase() : null;

            logger.info(`LogController - inserirLog  - idCliente: ${req.idCliente} - placaVeiculo: ${req.body.placaVeiculo}`);

            this._logService.salvar(req.body)
                                .then(() => res.sendStatus(202))
                                .catch(erro => next(erro));
        }

        obterLogs(req,res,next){
            req.checkQuery('dataIni', 'A data inicial não é válida').notEmpty();
            req.checkQuery('dataFim', 'A data final não é válida').notEmpty();
            
            if(this._possuiErrosDeValidacao(req,res))
                return;
            
            let objetoRetorno={};
            let placaVeiculo = req.query.placaVeiculo ? req.query.placaVeiculo.toUpperCase() : null;
            let idLog = req.query.idLog ? req.query.idLog : null;

            logger.info(`LogController - obterLogs - idCliente: ${req.idCliente} - idLog: ${req.query.idLog} - dataInicial: ${req.idCliente} - dataFim: ${req.idCliente} - placaVeiculo: ${placaVeiculo}`);
            
            if(req.query.idLog == util.log.BILHETE && placaVeiculo == null){
                
                this._bilheteRepository.filtrarBilhetesVendidosNoPeriodo(req.idCliente, req.query.dataIni, req.query.dataFim)
                    .then(result =>{
                        objetoRetorno.logs = result;

                        objetoRetorno.logs.map(item => {
                            item.evento = this._Util.descLogs[item.idLog];     
                            item.dataHoraFormatada = this._DateUtil.formataDataHora(item.dataHoraEvento, req.gmtCliente);
                        });

                        res.json(objetoRetorno.logs);
                    }).catch(erro => next(erro));

            }else if(req.query.idLog == null && placaVeiculo == null){

                let promises = [
                    this._LogRepository.obterLogs(req.idCliente, req.query.idLog, placaVeiculo, req.query.dataIni, req.query.dataFim),
                    this._bilheteRepository.filtrarBilhetesVendidosNoPeriodo(req.idCliente, req.query.dataIni, req.query.dataFim)
                ];
                
                Promise.all(promises)
                    .then(result => {
                        objetoRetorno.logs = result[0];
                        objetoRetorno.logsBilhete = result[1];

                        objetoRetorno.logsBilhete.forEach(item => {
                            objetoRetorno.logs.push(item);
                        });

                        objetoRetorno.logs.map(item => {
                            item.evento = this._Util.descLogs[item.idLog];     
                            item.dataHoraFormatada = this._DateUtil.formataDataHora(item.dataHoraEvento, req.gmtCliente);
                        });
                        
                    }).then(() => {
                        res.json(objetoRetorno.logs);
                    }).catch(erro => next(erro));
            
            }else if(req.query.idLog != util.log.BILHETE && placaVeiculo != null){
            
                this._LogRepository.obterLogs(req.idCliente, req.query.idLog, placaVeiculo, req.query.dataIni, req.query.dataFim)
                    .then(result =>{
                        objetoRetorno.logs = result;

                        objetoRetorno.logs.map(item => {
                            item.evento = this._Util.descLogs[item.idLog];     
                            item.dataHoraFormatada = this._DateUtil.formataDataHora(item.dataHoraEvento, req.gmtCliente);
                        });

                        res.json(objetoRetorno.logs);

                    }).catch(erro => next(erro));

            }else{
                res.sendStatus(204)
            }
        }

        obterComboLogs(req,res,next){
            return res.json(this._Util.descLogs);
        }

        _possuiErrosDeValidacao(req,res){           
            let erros = req.validationErrors();

            if(erros){
                res.status(422)
                   .json(erros);
                return true;
            }
        }
    };
