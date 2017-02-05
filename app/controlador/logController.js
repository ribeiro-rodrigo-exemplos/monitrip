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

            let util = this._Util;
            let dateUtil = this._DateUtil;

            this._LogRepository
                .obterLogs(req.idCliente, 
                           req.query.idLog,
                           req.query.placaVeiculo,
                           req.query.dataIni,
                           req.query.dataFim
                )
                .then(logs => {
                    logs.map(function(item){
                        item.evento = util.descLogs[item.idLog];     
                        item.dataHoraFormatada = dateUtil.formataDataHora(item.dataHoraEvento);
                    })

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
    }
