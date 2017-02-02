module.exports = () =>
    class LogController{
        constructor(logService, logRepository){
            this._logService = logService;
            this._LogRepository = logRepository;
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
            req.checkQuery('dataIni', 'A data nao e valida').notEmpty();
            req.checkQuery('dataFim', 'A data nao e valida').notEmpty();
            req.checkQuery('placaVeiculo', 'A data nao e valida').notEmpty();

            if(this._possuiErrosDeValidacao(req,res))
                return;

            return this._LogRepository.obterLogs();
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
