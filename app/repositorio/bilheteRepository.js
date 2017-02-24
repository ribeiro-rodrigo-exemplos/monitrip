/**
 * Created by rodrigo on 23/02/17.
 */
module.exports = () =>
    class BilheteRepository{
        constructor(Bilhete){
            this._Bilhete = Bilhete
        }

        filtrarBilhetes(clienteId,codigo,dataAtualizacao){
            let criteria = {};

            if(clienteId && !codigo && !dataAtualizacao)
                criteria.clienteId = clienteId;

            if(dataAtualizacao)
                criteria.dt_atualizacao = {"$gte": new Date(dataAtualizacao)};

            if(codigo)
                criteria.numeroBilheteEmbarque = codigo;

            return BilheteRepository._prepareResult(criteria);
        }

        static _prepareResult(criteria,fields){
            return this._Bilhete.find(criteria,fields);
        }
    }