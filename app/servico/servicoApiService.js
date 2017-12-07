let restify = require('restify');
const safira = require('safira');

class ServicoApiService{
    constructor(logger,config){
        this._logger = logger;
        this._client = restify.createJsonClient({
            url:config['worker-servico'].api
        });
    }

    buscarPontos(){
        this._logger.info(`ServicoApiService - obterPontos`);

        const url = `/api/v1/pontos`; 
        return this._sendRequest(this._client.get,url,'Erro ao obter pontos no worker de serviço');
    }

    buscarLinhas(idCliente){
        this._logger.info(`ServicoApiService - obterLinhas - idCliente: ${idCliente}`);

        const url = `/api/v1/clientes/${idCliente}/prefixosLinha`;
        return this._sendRequest(this._client.get,url,'Erro ao obter linhas no worker de serviço');
    }

    
    _prepareResult(resolve,reject,res,errorMessage){
        if(res){
            resolve(res.body != "" ? JSON.parse(res.body) : res.status = 204);
            return; 
        }
        reject(new Error(errorMessage));
    }

    _sendRequest(method,url,errorMessage){
        method = method.bind(this._client);
        return new Promise((resolve,reject) => method(url,(err,req,res,result) => this._prepareResult(resolve,reject,res,errorMessage))); 
    }
}

safira.define(ServicoApiService);