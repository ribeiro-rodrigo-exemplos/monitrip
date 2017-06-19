let logger = require('../util/log');

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

            console.log(req.body);

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
            
            let placaVeiculo = req.query.placaVeiculo ? req.query.placaVeiculo.toUpperCase() : null;
            let idLog = req.query.idLog ? req.query.idLog : null;

            logger.info(`LogController - obterLogs - idCliente: ${req.idCliente} - idLog: ${idLog} - dataInicial: ${req.query.dataIni} - dataFim: ${req.query.dataFim} - placaVeiculo: ${placaVeiculo}`);
            
            this._logService.buscarLogs(req.idCliente, req.query.dataIni, req.query.dataFim, idLog, placaVeiculo, req.gmtCliente)
                .then(result => result ? res.json(result) : res.sendStatus(204))
                .catch(erro => next(erro));
        
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
