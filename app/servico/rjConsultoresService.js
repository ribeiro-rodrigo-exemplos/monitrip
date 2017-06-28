const rjConfig = require('../bootstrap/config-bootstrap')()['rjConsultores'];
let restify = require('restify');
const logger = require('../util/log');

module.exports = () => 
    class RjConsultoresService{
        constructor(){
            this._client = restify.createClient({
                url: rjConfig.url,
                headers:{
                    'Authorization':rjConfig.authorization
                }
            });
        }

        enviarCheckin(bilhete,infoConexao){
            logger.info(`RjConsultoresService - enviarCheckin(${bilhete})`);

            const url = `/WSMonitriip/checkin/enviaCheckin/${infoConexao.codigoConexao}/${infoConexao.codigoCliente}/`+
            `${bilhete.idPontoOrigemViagem}/${bilhete.idPontoDestinoViagem}/${bilhete.numServico}/${bilhete.dataViagem}/${bilhete.numeroPoltrona}`;

            return new Promise((resolve,reject) => {
                this._client.get(url,(err,req) => {
                    req.on('result',(err,res) => {
                        res.on('data',(chunk) => {
                            if(err)
                                reject(err);
                            else
                                resolve(res.body);

                        })
                    });
                });
            });
        }
    }