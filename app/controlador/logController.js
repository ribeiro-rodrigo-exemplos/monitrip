module.exports = () =>
    class LogController{
        constructor(logService){
            this._logService = logService;
        }

        inserirLog(req,res,next){
            
            if(this._possuiErrosDeValidacao(req,res))
                return;

            this._logService.salvar(req.body)
                                .then(() => res.sendStatus(202))
                                .catch(erro => next(erro));
        }

        _possuiErrosDeValidacao(req,res){
            req.assert('idLog','Id do log é obrigatório').notEmpty();
            let erros = req.validationErrors();

            if(erros){
                res.status(422)
                    .json(erros);
                return true;
            }
        }
    }
