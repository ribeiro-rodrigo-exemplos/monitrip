module.exports = () => 
    class ViagemAdapter{
        constructor(viagemApiService){
            this._logStrategy = {
                '4' : this._eventoDeVelocidadeLocalizacao,
                '5' : this._eventoDeJornada,
                '6' : this._eventoDeParada, 
                '7' : this._eventoDeViagem,
                '8' : this._eventoDeViagem,
                '9' : this._eventoBilhete, 
                '250' : this._eventoDeDirecaoContinua  
            };

            this._api = viagemApiService; 
        }

        registrarEvento(evento,infoCliente){
            let strategy = this._logStrategy[evento.idLog].bind(this);
            return strategy(evento);  
        }

        _eventoBilhete(evento){
            return this._api.registrarBilhetes(evento.idViagem,evento.idJornada,evento); 
        }

        _eventoDeJornada(evento){
            const tipoEventoJornada = {
                '0' : evento => evento.idViagem ? this._api.fecharPeriodoDeViagem(evento.idViagem,evento.idJornada,evento) : this._fecharJornada(evento.idJornada,evento), 
                '1' : evento => this._interpretarAberturaDeJornada(evento),  
                '2' : evento => this._api.abrirPeriodoDeViagem(evento.idViagem,evento.idJornada,evento)
            }; 

            let strategy = tipoEventoJornada[evento.tipoRegistroEvento];

            return strategy(evento); 
        }

        _eventoDeViagem(evento){
            const tipoEventoViagem = {
                '0' : this._api.fecharViagem,
                '1' : this._api.abrirViagem
            };

            let strategy = tipoEventoViagem[evento.tipoRegistroViagem].bind(this._api); 

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

