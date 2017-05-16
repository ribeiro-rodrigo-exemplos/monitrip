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

            return this._prepareResult(criteria, {"_id": 0, clienteId: 0});
        }
    };