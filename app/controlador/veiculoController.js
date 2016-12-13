class VeiculoController{
    constructor(app){
        this._MysqlConnectionFactory = app.database.mysqlConnectionFactory;
        this._VeiculoRepository = app.repositorio.veiculoRepository;
        this._validadorDeData = app.util.validadorDeData;
        this._idCliente = 154; // teste
    }

    obter(req,res,next){

        let placa = req.query.placa;
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        let connection = new this._MysqlConnectionFactory();
        let veiculoRepository = new this._VeiculoRepository(connection);

        veiculoRepository
                .filtrarVeiculos(this._idCliente,placa,dataAtualizacao)
                    .then( veiculos => {
     
                            if(veiculos)
                                res.json(veiculos);
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


