const safira = require('safira');
let rjConfig =  safira.bean('config').rjConsultores;
let restify = require('restify');

class RjConsultoresService{
    constructor(logger){
        this._logger = logger;
        this._client = restify.createClient({
            url: rjConfig.url,
            headers:{
                'Authorization':rjConfig.authorization
            }
        });
    }

    enviarCheckin(bilhete,infoConexao){
        this._logger.info(`RjConsultoresService - enviarCheckin()`);

        const url = `/WSMonitriip/checkin/enviaCheckin/${infoConexao.codigoConexao}/${infoConexao.codigoCliente}/`+
        `${bilhete.idPontoOrigemViagem}/${bilhete.idPontoDestinoViagem}/${bilhete.numServico}/${bilhete.dataViagem}/${bilhete.numeroPoltrona}`;

        return new Promise((resolve,reject) => {
            this._client.get(url,(err,req) => {
                req.on('result',(err,res) => {
                    res.on('data',(chunk) => {
                        if(err)
                            reject(err);
                        else{
                            resolve(res.body);
                            this._logger.info(`RjConsultoresService - checkin do bilhete ${bilhete.numeroBilheteEmbarque} - ${infoConexao.idCliente} realizado com sucesso`);
                        }
                    })
                });
            });
        });
    }
}

safira.define(RjConsultoresService);