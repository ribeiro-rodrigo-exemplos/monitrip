class LogController{
    constructor(app){
        this._logService = app.servico.logService;
    }

    inserirLogDeViagemFretada(req,res,next){
        
        if(this._possuiErrosDeValidacao(req,res))
            return;

        this._logService.salvar(req.body)
                            .then(() => res.sendStatus(202))
                            .catch(erro => next(erro));
    }

    inserirLogDeViagemRegular(req,res,next){
        if(this._possuiErrosDeValidacao(req,res))
            return;

        this._logService.salvar(req.body)
                            .then(() => res.sendStatus(202))
                            .catch(erro => next(erro));
    }

    inserirLogDeDetectorDeParada(req,res,next){
        if(this._possuiErrosDeValidacao(req,res))
            return;

        this._logService.salvar(req.body)
                            .then(() => res.sendStatus(202))
                            .catch(erro => next(erro));
    }

    inserirLogDeJornadaDeTrabalho(req,res,next){
        if(this._possuiErrosDeValidacao(req,res))
            return;

        this._logService.salvar(req.body)
                            .then(() => res.sendStatus(202))
                            .catch(erro => next(erro));
    }

    inserirLogDeVelocidadeELocalizacao(req,res,next){
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

module.exports = app => new LogController(app);