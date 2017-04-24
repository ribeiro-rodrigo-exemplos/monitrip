let logger = require('../util/log');

module.exports = () =>
    class LogController{
        constructor(logService, logRepository, util, dateUtil){
            this._logService = logService;
            this._LogRepository = logRepository;
            this._Util = util;
            this._DateUtil = dateUtil;
        }

        inserirLog(req,res,next){
            req.assert('idLog','Id do log é obrigatório').notEmpty();

            if(this._possuiErrosDeValidacao(req,res))
                return;

            req.body.idCliente = req.idCliente;

            req.body.idViagem = req.header('idViagem');
            req.body.idTransbordo = req.header('idTransbordo');
            req.body.idJornada = req.header('idJornada');

            req.body.placaVeiculo = req.body.placaVeiculo ? req.body.placaVeiculo.toUpperCase() : null;

            logger.info(`LogController - inserirLog  - idCliente: ${req.idCliente} - placaVeiculo: ${req.body.placaVeiculo.toUpperCase()}`);

            this._logService.salvar(req.body)
                                .then(() => res.sendStatus(202))
                                .catch(erro => next(erro));
        }

        obterLogs(req,res,next){
            req.checkQuery('dataIni', 'A data inicial não é válida').notEmpty();
            req.checkQuery('dataFim', 'A data final não é válida').notEmpty();
            req.checkQuery('placaVeiculo', 'A placa do veiculo não é válida').notEmpty();

            if(this._possuiErrosDeValidacao(req,res))
                return;

            let placaVeiculo = req.query.placaVeiculo ? req.query.placaVeiculo.toUpperCase() : null;

            logger.info(`LogController - obterLogs  - idCliente: ${req.idCliente} - idLog: ${req.query.idLog} - dataInicial: ${req.idCliente} - dataFim: ${req.idCliente} - placaVeiculo: ${placaVeiculo}`);

            this._LogRepository
                .obterLogs(req.idCliente, 
                           req.query.idLog,
                           placaVeiculo,
                           req.query.dataIni,
                           req.query.dataFim
                )
                .then(logs => {
                    logs.map(item => {
                        item.evento = this._Util.descLogs[item.idLog];     
                        item.dataHoraFormatada = this._DateUtil.formataDataHora(item.dataHoraEvento, req.gmtCliente);
                    });

                    return res.json(logs);
                })
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
