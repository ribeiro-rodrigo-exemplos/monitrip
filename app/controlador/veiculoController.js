let logger = require('../util/log');

module.exports = () =>
    class VeiculoController {
        constructor(veiculoRepository, validadorDeData, retornoDTO) {
            this._veiculoRepository = veiculoRepository;
            this._validadorDeData = validadorDeData;
            this._RetornoDTO = retornoDTO;
        }

        obter(req, res, next) {

            let placa = req.query.placa;
            let dataAtualizacao = req.query.dataAtualizacao;

            if (dataAtualizacao && !this._dataValida(dataAtualizacao)) {
                res.sendStatus(204);
                return;
            }

            logger.info(`VeiculoController - obter  - placa: ${placa} - dataAtualizacao: ${dataAtualizacao}`);

            this._veiculoRepository
                .filtrarVeiculos(req.idCliente, placa, dataAtualizacao)
                .then(veiculos => {
                    if (veiculos)
                        res.json(new this._RetornoDTO(veiculos, 'veiculos'));
                    else
                        res.sendStatus(204);
                }).catch(erro => next(erro));
        }

        _dataValida(dataAtualizacao) {
            return this._validadorDeData.validarDataEHora(dataAtualizacao);
        }
    };



    


