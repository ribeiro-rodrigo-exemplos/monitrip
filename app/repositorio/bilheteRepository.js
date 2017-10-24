const safira = require('safira');
const moment = require('moment');

class BilheteRepository {
    constructor(logger, bilhete, checkin) {
        this._Bilhete = bilhete;
        this._Checkin = checkin;
        this._formatoData = 'YYYYMMDD';
        this._formatoHora = 'HHmmss';
        this._logger = logger;
    }

    filtrarBilhetes(numero, dataHoraInicioViagem,identificacaoLinha, clienteId) {

        this._logger.info(`BilheteRepository - filtrarBilhetes(${numero},${dataHoraInicioViagem},${identificacaoLinha}, ${clienteId})`);

        let criteria = {};

        if (clienteId)
            criteria.clienteId = clienteId;

        if(dataHoraInicioViagem){
            
            dataHoraInicioViagem = moment(dataHoraInicioViagem);
            criteria.dataViagem = dataHoraInicioViagem.format(this._formatoData);
            criteria.horaViagem = dataHoraInicioViagem.format(this._formatoHora);
        }
            
        if (numero)
            criteria.numeroBilheteEmbarque = numero;

        if (identificacaoLinha)
            criteria.identificacaoLinha = identificacaoLinha;

        return this._prepareResult(criteria, {"_id": 0, clienteId: 0});
    }

    obterBilhetesPorNumerosEDatas(numeros,datas,idCliente){
        let criteria = {
            numeroBilheteEmbarque:{$in:numeros},
            dataViagem:{$in:datas},
            clienteId:idCliente
        };

        return this._prepareResult(criteria,{
            idPontoOrigemViagem:1,
            idPontoDestinoViagem:1,
            identificacaoLinha:1,
            dataViagem:1,
            numeroBilheteEmbarque:1,
            numeroPoltrona:1,
            numServico:1,
            clienteId:1,
            _id:0
        });  
    }

    salvarCheckin(bilhete,dataHoraEvento, idViagem){
        return this._Checkin.create({dataHoraEvento:dataHoraEvento, idViagem: idViagem, bilhete:bilhete});
    }

    filtrarBilhetesVendidosNoPeriodo(clienteId, dataInicio, dataFim){

        this._logger.info(`BilheteRepository - filtrarBilhetesVendidosNoPeriodo(${clienteId},${dataInicio},${dataFim})`);
        
        let criteria = {
                        "clienteId": clienteId,
                        $and: [{"dataHoraEvento": {$gte: dataInicio}},
                            {"dataHoraEvento": {$lte: dataFim}}]
                    };

        return this._prepareResult(criteria, {"_class": 0, "_id": 0});
    }

    _prepareResult(criteria, fields) {
        return this._Bilhete.find(criteria, fields).lean().exec();
    }
};

safira.define(BilheteRepository);