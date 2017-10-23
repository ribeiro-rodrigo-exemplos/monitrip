const safira = require('safira');

class LogController{
    constructor(logService, logRepository, bilheteRepository, constantes, logger){
        this._logService = logService;
        this._LogRepository = logRepository;
        this._bilheteRepository = bilheteRepository;
        this._constantes = constantes;
        this._logger = logger;
    }

    inserirLog(req,res,next){

        req.assert('idLog','Id do log é obrigatório').notEmpty();

        if(this._possuiErrosDeValidacao(req,res))
            return;

        req.body.idCliente = req.idCliente;

        req.body.idViagem = req.header('idViagem');
        req.body.idJornada = req.header('idJornada');
        req.body.idTransacao = req.header('idTransacao');
        req.body.motivo = req.header('logMotivo');

        req.body.placaVeiculo = req.body.placaVeiculo ? req.body.placaVeiculo.toUpperCase() : null;

        this._logger.info(`LogController - inserirLog - idCliente: ${req.idCliente} - placaVeiculo: ${req.body.placaVeiculo}`);

        const infoCliente = {
            gmt:req.gmtCliente,
            cpfMotorista:req.header('cpfMotorista'),
            appVersion:req.header('appVersao')
        };

        this._logService.salvar(req.body,infoCliente)
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

        this._logger.info(`LogController - obterLogs - idCliente: ${req.idCliente} - idLog: ${idLog} - dataInicial: ${req.query.dataIni} - dataFim: ${req.query.dataFim} - placaVeiculo: ${placaVeiculo}`);
        
        this._logService.buscarLogs(req.idCliente, req.query.dataIni, req.query.dataFim, idLog, placaVeiculo, req.gmtCliente)
            .then(result => result ? res.json(result) : res.sendStatus(204))
            .catch(erro => next(erro));
    
    }


    obterComboLogs(req,res,next){
        return res.json(this._constantes.descLogs);
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

safira.define(LogController);