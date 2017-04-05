/**
 * Created by rodrigo on 23/02/17.
 */
const logger = require('../util/log');
const mongoose = require('mongoose');

module.exports = () =>
    class BilheteRepository {
        constructor() {
            this._Bilhete = mongoose.model('Bilhete');
        }

        filtrarBilhetes(numero, dataVenda, identificacaoLinha, clienteId) {

            logger.info(`BilheteRepository - filtrarBilhetes(${numero},${dataVenda},${identificacaoLinha}, ${clienteId})`);

            let criteria = {};

            if (clienteId)
                criteria.clienteId = clienteId;

            if (dataVenda)
                criteria.dt_atualizacao = {"$gte": dataVenda,"$lte":dataVenda};

            if (numero)
                criteria.numeroBilheteEmbarque = numero;

            if (identificacaoLinha)
                criteria.identificacaoLinha = identificacaoLinha;

            return this._prepareResult(criteria, {"_id": 0, clienteId: 0});
        }

        _prepareResult(criteria, fields) {
            return this._Bilhete.find(criteria, fields);
        }
    };