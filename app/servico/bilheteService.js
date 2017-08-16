const logger = require('../util/log');

module.exports = () => 
    class BilheteService{
        constructor(bilheteRepository,rjConsultoresService,clienteRepository,constantes){
            this._rjConsultoresService = rjConsultoresService;
            this._clienteRepository = clienteRepository;
            this._constantes = constantes;
            this._bilheteRepository = bilheteRepository;  
        }

        registrarCheckin(leituraDeBilheteEvento){
            logger.info(`BilheteService - registrarCheckin(${leituraDeBilheteEvento})`);

            return this._clienteRepository
                        .obterInformacoesDeConexaoComRJConsultores(leituraDeBilheteEvento.idCliente)
                        .then(infoConexao => {
                            if(infoConexao)
                                return this._bilheteRepository
                                            .filtrarBilhetes(leituraDeBilheteEvento.numeroBilheteEmbarque)
                                            .then(result => result.length ? this._rjConsultoresService.enviarCheckin(result[0],infoConexao) : null);
                        });
        }

        ehLeituraDeBilhete(log){
            logger.info(`BilheteService - ehLeituraDeBilhete(${log})`);

            return this._constantes.log.LEITURA_BILHETE == log.idLog; 
        }

    }