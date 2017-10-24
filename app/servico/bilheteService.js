const safira = require('safira');

class BilheteService{
    constructor(bilheteRepository,rjConsultoresService,clienteRepository,constantes,logger){
        this._rjConsultoresService = rjConsultoresService;
        this._clienteRepository = clienteRepository;
        this._constantes = constantes;
        this._bilheteRepository = bilheteRepository;
        this._logger = logger;
    }

    registrarCheckin(leituraDeBilheteEvento){
        this._logger.info(`BilheteService - registrarCheckin()`);

        return this._clienteRepository
                    .obterInformacoesDeConexaoComRJConsultores(leituraDeBilheteEvento.idCliente)
                    .then(infoConexao => {
                        if(infoConexao)
                            return this._obterBilhetesParaCheckin(leituraDeBilheteEvento)
                                        .then(bilhetes => 
                                                        bilhetes.forEach(bilhete => 
                                                            this._rjConsultoresService.enviarCheckin(bilhete,infoConexao)
                                                                .then(() => this._bilheteRepository.salvarCheckin(bilhete,leituraDeBilheteEvento.dataHoraEvento, leituraDeBilheteEvento.idViagem))
                                                                .catch(e => this._logger.error('Erro ao realizar checkin'))
                                                        )
                                                );
                    });
    }

    ehLeituraDeBilhete(log){
        this._logger.info(`BilheteService - ehLeituraDeBilhete(${log})`);

        return this._constantes.log.LEITURA_BILHETE == log.idLog; 
    }

    _obterBilhetesParaCheckin(leituraDeBilheteEvento){
        this._logger.info(`BilheteService - _obterBilhetesParaCheckin()`);

        const NUMEROS = 0;
        const DATAS = 1;

        return this._bilheteRepository.obterBilhetesPorNumerosEDatas(
            ... leituraDeBilheteEvento.bilhetes 
                                    .filter(bilhete => /[1-9]/.test(bilhete.numeroBilheteEmbarque))
                                    .reduce((params,bilhete) => {
                                        params[NUMEROS].push(bilhete.numeroBilheteEmbarque);
                                        params[DATAS].push(bilhete.dataPrevistaViagem);
                                        return params; 
                                    },[[],[]]),leituraDeBilheteEvento.idCliente
        );
    }

}

safira.define(BilheteService);