class VeiculoController{
    constructor(app){
        this._connection = new app.database.mysqlConnectionFactory();
        this._veiculoRepository = new app.repositorio.veiculoRepository(this._connection);
        this._validadorDeData = app.util.validadorDeData;
        this._idCliente = 154; // teste
    }

    obter(req,res){

        let placa = req.query.placa;
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._veiculoRepository
                .filtrarVeiculos(this._idCliente,placa,dataAtualizacao)
                    .then( veiculos => {
     
                            if(veiculos)
                                res.json(veiculos);
                            else
                                res.sendStatus(204);
                        })
                        .catch(erro => res
                                        .status(500)
                                        .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde')
                            );

    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = (app) => new VeiculoController(app) 


