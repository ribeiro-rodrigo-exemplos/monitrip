module.exports = () => 
    class WorkerProcessamentoService{
        constructor(amqpUtil,dateUtil){
            this._logStrategy = {
                '4':this._eventoDeVelocidadeLocalizacao,
                '5':this._eventoDeJornada,
                '6':this._eventoDeParada, 
                '7':this._eventoDeViagem,
                '8':this._eventoDeViagem,
                '9':this._eventoBilhete, 
                '250':this._eventoDeDirecaoContinua  
            }; 
        }

        salvarLog(log,infoCliente){
            
        }

        _eventoBilhete(log){

        }

        _eventoDeJornada(log){

        }

        _eventoDeViagem(log){

        }

        _eventoDeVelocidadeLocalizacao(log){

        }

        _eventoDeDirecaoContinua(log){

        }

        _eventoDeParada(log){

        }
    }

