/**
 * Created by rodrigo on 20/02/17.
 */
let logger = require('../util/log');

module.exports = () =>
    class ServicoController{
        constructor(servicoRepository,retornoDTO){
            this._servicoRepository = servicoRepository;
            this._RetornoDTO = retornoDTO;
        }

        obter(req, res, next) {

            const dataInicio = req.query.dataInicio;
            const dataFim = req.query.dataFim;

            logger.info(`ServicoController - obter ${req.idCliente} de ${dataInicio} a ${dataFim}`);

            const erros = this._validarParametrosDeConsulta(req);

            if (erros) {
                res.json(erros)
                    .status(400);
                return;
            }

            this._servicoRepository
                .obterServicos(req.idCliente, dataInicio, dataFim)
                .then(servicos => {
                    logger.info(`ServicoController - obter ${req.idCliente} de ${dataInicio} a ${dataFim} - sucesso`)
                    servicos ? res.json(new this._RetornoDTO(servicos,'servicos')) : res.sendStatus(204)
                })
                .catch(erro => next(erro));
        }

        _validarParametrosDeConsulta(req) {
            logger.info(`ServicoController - _validarParametrosDeConsulta ${req.idCliente}`);

            req.checkQuery('dataInicio', 'parametro obrigatório').notEmpty();
            req.checkQuery('dataFim', 'parametro obrigatório').notEmpty();
            req.checkQuery('dataInicio', 'deve estar no formato ISO').isDate();
            req.checkQuery('dataFim', 'deve estar no formato ISO').isDate();

            return req.validationErrors();
        }
    };
