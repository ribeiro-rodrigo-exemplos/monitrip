class VeiculoController{
    constructor(app){
        this._veiculoRepository = app.repositorio.veiculoRepository;
        this._validadorDeData = app.util.validadorDeData;

        this._RetornoDTO = app.util.dto.retornoDTO;
    }

    obter(req,res,next){

        let placa = req.query.placa;
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._veiculoRepository
                .filtrarVeiculos(req.idCliente,placa,dataAtualizacao)
                    .then( veiculos => {
                            if(veiculos)
                                res.json(new this._RetornoDTO(veiculos,'veiculos'));
                            else
                                res.sendStatus(204);
                        })
                        .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = (app) => new VeiculoController(app) 


