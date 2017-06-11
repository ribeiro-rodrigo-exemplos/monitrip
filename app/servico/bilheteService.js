module.exports = () => 
    class BilheteService{
        constructor(rjConsultoresService,clienteRepository,constantes){
            this._rjConsultoresService = rjConsultoresService;
            this._clienteRepository = clienteRepository;
            this._constantes = constantes; 
        }

        registrarCheckin(bilhete){
            return this._clienteRepository
                        .obterInformacoesDeConexaoComRJConsultores(bilhete)
                        .then(infoConexao => {
                            console.log(infoConexao);
                            return infoConexao;
                        });
        }

        ehLeituraDeBilhete(log){
            return this._constantes.log.LEITURA_BILHETE == log.idLog; 
        }
    }