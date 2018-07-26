const safira = require('safira');
    
class ViagemAdapter{
    constructor(viagemApiService,dateUtil){

        this._api = viagemApiService;
        this._dateUtil = dateUtil; 

        this._logStrategy = {
            '4' : this._eventoDeVelocidadeLocalizacao,
            '5' : this._eventoDeJornada,
            '6' : this._eventoDeParada, 
            '7' : this._eventoDeViagem,
            '8' : this._eventoDeViagem,
            '9' : this._eventoBilhete, 
            '250' : this._eventoDeDirecaoContinua  
        };

        this._tipoEventoJornada = {
            '0' : evento => evento.idViagem ? this._api.fecharPeriodoDeViagem(evento.idViagem,evento.idJornada,evento) : this._api.fecharJornada(evento.idJornada,evento), 
            '1' : evento => this._interpretarAberturaDeJornada(evento),  
            '2' : evento => this._api.abrirPeriodoDeViagem(evento.idViagem,evento.idJornada,evento)
        };

        this._tipoEventoViagem = {
            '0' : this._api.fecharViagem,
            '1' : this._api.abrirViagem,
            '2' : this._api.fecharViagem,
            '3' : this._api.abrirViagem
        }; 
    }

    registrarEvento(evento,infoCliente){

        if(!evento.idJornada || !infoCliente.appVersion || parseFloat(infoCliente.appVersion) < 1.6)
            return new Promise((resolve,reject) => resolve()); 

        evento.dataHoraEvento = this._dateUtil.aplicaTimeZoneEmUTC(evento.dataHoraEvento,infoCliente.gmt);

        let strategy = this._logStrategy[evento.idLog].bind(this);
        return strategy(evento);  
    }

    _eventoBilhete(evento){
        return this._api.registrarBilhetes(evento.idViagem,evento.idJornada,evento); 
    }

    _eventoDeJornada(evento){
        let strategy = this._tipoEventoJornada[evento.tipoRegistroEvento];
        return strategy(evento); 
    }

    _eventoDeViagem(evento){
        let strategy = this._tipoEventoViagem[evento.tipoRegistroViagem].bind(this._api); 
        return strategy(evento.idViagem,evento);
    }

    _eventoDeVelocidadeLocalizacao(evento){
        return this._api.registrarLocalizacao(evento.idViagem,evento.idJornada,evento); 
    }

    _eventoDeDirecaoContinua(evento){
        return this._api.registrarDirecaoContinua(evento.idViagem,evento.idJornada,evento);
    }

    _eventoDeParada(evento){
        return this._api.registrarParada(evento.idViagem,evento.idJornada,evento); 
    }

    _interpretarAberturaDeJornada(evento){
        if(evento.motivo)
            return this._api.abrirPeriodoDeViagem(evento.idViagem,evento.idJornada,evento);
            
        if(evento.idViagem && evento.idJornada)    
            return this._api.criarPeriodoDeViagem(evento.idViagem,evento.idJornada,evento);
        else
            return this._api.abrirJornada(evento.idJornada,evento); 
    }
}

safira.define(ViagemAdapter);