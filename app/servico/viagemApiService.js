let restify = require('restify');
const safira = require('safira');

class ViagemApiService{
    constructor(logger,config){
        this._logger = logger;
        this._client = restify.createJsonClient({
            url:config['worker-processamento'].api
        });
    }

    abrirViagem(idViagem,log){
        this._logger.info(`ViagemApiService - abrirViagem - idViagem: ${idViagem} - log: ${log}`);

        const url = `/api/viagens/${idViagem}`; 
        return this._sendRequest(this._client.put,url,log,'Erro ao abrir viagem no worker de processamento');
    }

    fecharViagem(idViagem,log){
        const url = `/api/viagens/${idViagem}`;
        return this._sendRequest(this._client.patch,url,log,'Erro ao fechar viagem no worker de processamento');
    }

    abrirJornada(idJornada,log){
        const url = `/api/jornadas/${idJornada}`;
        return this._sendRequest(this._client.put,url,log,'Erro ao abrir jornada no worker de processamento');
    }

    fecharJornada(idJornada,log){
        const url = `/api/jornadas/${idJornada}`;
        return this._sendRequest(this._client.patch,url,log,'Erro ao fechar jornada no worker de processamento'); 
    }

    criarPeriodoDeViagem(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}`;
        return this._sendRequest(this._client.put,url,log,'Erro ao fechar jornada no worker de processamento'); 
    }

    abrirPeriodoDeViagem(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}?estado=ABERTO`;
        return this._sendRequest(this._client.patch,url,log,'Erro ao abrir periodo no worker de processamento');
    }

    fecharPeriodoDeViagem(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}?estado=FECHADO`;
        return this._sendRequest(this._client.patch,url,log,'Erro ao fechar periodo no worker de processamento'); 
    }

    registrarBilhetes(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}/bilhetes`;
        return this._sendRequest(this._client.post,url,log,'Erro ao registrar bilhetes no worker de processamento'); 
    }

    registrarLocalizacao(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}/localizacoes`; 
        return this._sendRequest(this._client.post,url,log,'Erro ao registrar localizacao no worker de processamento');
    }

    registrarParada(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}/paradas`; 
        return this._sendRequest(this._client.post,url,log,'Erro ao registrar parada no worker de processamento');
    }

    registrarDirecaoContinua(idViagem,idJornada,log){
        const url = `/api/viagens/${idViagem}/jornadas/${idJornada}/direcoes`; 
        return this._sendRequest(this._client.put,url,log,'Erro ao registrar direcao continua no worker de processamento');
    }

    _prepareResult(resolve,reject,res,errorMessage){
        if(res){
            resolve(res.statusCode == 204 ? true : false);
            return; 
        }
        reject(new Error(errorMessage));
    }

    _sendRequest(method,url,body,errorMessage){
        method = method.bind(this._client);
        return new Promise((resolve,reject) => method(url,body,(err,req,res,result) => this._prepareResult(resolve,reject,res,errorMessage))); 
    }
}

safira.define(ViagemApiService);