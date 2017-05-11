const logger = require('../util/log');

module.exports = () =>
    class ClienteRepository {
        constructor(cliente, dispositivo) {
            this._Cliente = cliente;
            this._Dispositivo = dispositivo;
        }

        obterQuantidadeMaximaDeLicencasDoCliente(idCliente) {
            logger.info(`ClienteRepository - obterQuantidadeMaximaDeLicencasDoCliente - idCliente: ${idCliente}`);

            return this._Cliente
                .findById(idCliente)
                .then(cliente => cliente.getFuncionalidades())
                .then(funcionalidades =>
                    funcionalidades.filter(funcionalidade => funcionalidade.dataValues.nome == 'Monitrip')
            )
                .then(funcionalidades => funcionalidades.length ? funcionalidades[0].dataValues.licenca.quantidade : 0)
        }

        obterQuantidadeDeDispositivosAtivosCadastrados(idCliente) {
            logger.info(`ClienteRepository - obterQuantidadeDeDispositivosAtivosCadastrados - idCliente: ${idCliente}`);

            return this._Dispositivo.count({where: {idCliente: idCliente, excluido: 0}})
                .then(count => count)
        }
    };
