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
        }

        filtrarBilhetes(numero, dataVenda, identificacaoLinha, clienteId) {

            logger.info(`BilheteRepository - filtrarBilhetes(${numero},${dataVenda},${identificacaoLinha}, ${clienteId})`);

            let criteria = {};

            if (clienteId)
                criteria.clienteId = clienteId;

            if (dataVenda){
                let data = moment(dataVenda);
                const formato = 'YYYY-MM-DD'
                criteria.dt_atualizacao = {"$gte": data.format(formato),"$lte":data.add(1,'days').format(formato)};
            }
                
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