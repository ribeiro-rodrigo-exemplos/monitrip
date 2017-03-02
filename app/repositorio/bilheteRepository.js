/**
 * Created by rodrigo on 23/02/17.
 */
const logger = require('../util/log');
const mongoose = require('mongoose');

module.exports = () =>
    class BilheteRepository{
        constructor(){
            this._Bilhete = mongoose.model('Bilhete');
        }

        filtrarBilhetes(numero,dataAtualizacao,clienteId){

            logger.info(`BilheteRepository - filtrarBilhetes(${numero},${dataAtualizacao},${clienteId})`);

            let criteria = {};

            if(clienteId)
                criteria.clienteId = clienteId;

            if(dataAtualizacao)
                criteria.dt_atualizacao = {"$gte": dataAtualizacao};

            if(numero)
                criteria.numeroBilheteEmbarque = numero;

            return this._prepareResult(criteria,{"_id":0,clienteId:0});
        }

        _prepareResult(criteria,fields){
            return this._Bilhete.find(criteria,fields);
        }
    }