const logger = require('../util/log');

module.exports = () =>
    class MotoristaRepository {
        constructor(motorista) {
            this._Motorista = motorista;
        }

        filtrarMotoristas(clienteId, cpf, dataAtualizacao) {

            let criteria = {};

            if (clienteId)
                criteria["id_cliente"] = clienteId;

            if (dataAtualizacao)
                criteria["dt_atualizacao"] = {$gte: dataAtualizacao};

            if (cpf)
                criteria["nm_cpf"] = cpf;

            logger.info(`MotoristaRepository - filtrarMotoristas - clienteId: ${clienteId} - cpf: ${cpf} - dataAtualizacao: ${dataAtualizacao}`);

            return new Promise((resolve,reject) =>{
                this._Motorista.findAll({where:criteria,attributes:['nm_cpf','nm_nomeFuncionario','fl_ativo', 'fl_situacao']})
                                .then(result => resolve(result.length ? result : null))
                                .catch(erro => reject(erro));
            });
        }
    };



