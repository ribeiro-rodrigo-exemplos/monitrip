/**
 * Created by rodrigo on 23/02/17.
 */

let logger = require('../util/log');

module.exports = () =>
    class BilheteController{
        constructor(bilheteRepository,retornoDTO){
            this._bilheteRepository = bilheteRepository;
            this._RetornoDTO = retornoDTO;
        }

        obterBilhetes(req,res,next){

            const erros = this._validarParametrosDeConsulta(req);

            if(erros){
                res.status(400)
                    .json(erros);

                return;
            }

            const dataAtualizacao = req.query.dataAtualizacao;
            const numeroBilhete = req.query.numero;

            logger.info(`BilheteController - obterBilhetes ${req.idCliente} ${dataAtualizacao} ${numeroBilhete}`);

            this._bilheteRepository
                    .filtrarBilhetes(numeroBilhete,dataAtualizacao,req.idCliente)
                    .then(bilhetes => bilhetes ? res.json(new this._RetornoDTO(bilhetes,'bilhetes')) : res.sendStatus(204))
                    .catch(erro => next(erro));
        }

        _validarParametrosDeConsulta(req){
            if(req.query.dataAtualizacao)
                req.checkQuery('dataAtualizacao','deve estar no formato ISO').isDateTime();

            return req.validationErrors();
        }
    }