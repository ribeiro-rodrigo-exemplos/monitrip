const safira = require('safira');
var config = safira.bean('config');

class InfoController{
    constructor(logger){
        this._logger = logger;
    }

    obterInformacoesDaAplicacao(req,res,next){
        this._logger.info(`InfoController - obterInformacoesDaAplicacao`);

        res.json(config);
    }
};

safira.define(InfoController);
