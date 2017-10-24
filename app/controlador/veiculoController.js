const safira = require('safira');

class VeiculoController {
    constructor(veiculoRepository, validadorDeData, logger,envelopeDTO) {
        this._veiculoRepository = veiculoRepository;
        this._validadorDeData = validadorDeData;
        this._envelopeDTO = envelopeDTO;
        this._logger = logger;
    }

    obter(req, res, next) {

        let placa = req.query.placa;
        let dataAtualizacao = req.query.dataAtualizacao;

        if (dataAtualizacao && !this._dataValida(dataAtualizacao)) {
            res.sendStatus(204);
            return;
        }

        this._logger.info(`VeiculoController - obter  - placa: ${placa} - dataAtualizacao: ${dataAtualizacao}`);

        this._veiculoRepository
            .filtrarVeiculos(req.idCliente, placa, dataAtualizacao)
            .then(veiculos => {
                if (veiculos)
                    res.json(this._envelopeDTO.toDTO(veiculos, 'veiculos'));
                else
                    res.sendStatus(204);
            }).catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao) {
        return this._validadorDeData.validarDataEHora(dataAtualizacao);
    }
};

safira.define(VeiculoController);