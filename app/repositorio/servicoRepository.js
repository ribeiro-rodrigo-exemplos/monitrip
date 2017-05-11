/**
 * Created by rodrigo on 20/02/17.
 */
const logger = require('../util/log');
const mongoose = require('mongoose');

module.exports = () =>
    class ServicoRepository {
        constructor() {
            this._Servico = mongoose.model('Servico');
        }

        obterServicos(clienteId, dataInicial, dataFinal) {

            logger.info(`ServicoRepository - obterServicos(${clienteId},${dataInicial},${dataFinal})`);

            let criteria = {
                idCliente: clienteId,
                dataServico: {
                    "$gte": dataInicial,
                    "$lte": dataFinal
                }
            };

            return this._Servico.find(criteria, {"_id": 0,"_class":0});
        }
    };
