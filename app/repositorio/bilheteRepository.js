/**
 * Created by rodrigo on 23/02/17.
 */
const logger = require('../util/log');
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = () =>
    class BilheteRepository {
        constructor() {
            this._Bilhete = mongoose.model('Bilhete');
            this._Checkin = mongoose.model('Checkin');
            this._formatoData = 'YYYYMMDD';
            this._formatoHora = 'HHmmss';
        }

        filtrarBilhetes(numero, dataHoraInicioViagem,identificacaoLinha, clienteId) {

            logger.info(`BilheteRepository - filtrarBilhetes(${numero},${dataHoraInicioViagem},${identificacaoLinha}, ${clienteId})`);

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

        salvarCheckin(bilhete,dataHoraEvento){
            return this._Checkin.create({dataHoraEvento:dataHoraEvento,bilhete:bilhete});
        }

        _prepareResult(criteria, fields) {
            return this._Bilhete.find(criteria, fields).lean().exec();
        }

        filtrarBilhetesVendidosNoPeriodo(clienteId, dataInicio, dataFim){

            logger.info(`BilheteRepository - filtrarBilhetesVendidosNoPeriodo(${clienteId},${dataInicio},${dataFim})`);
            
            let criteria = {
                            "clienteId": clienteId,
                            $and: [{"dataHoraEvento": {$gte: dataInicio}},
                                {"dataHoraEvento": {$lte: dataFim}}]
                        };

            return this._prepareResult(criteria, {"_class": 0, "_id": 0});
        }
    };