class LinhaController{
    constructor(app){
        this._LinhaRepository = app.repositorio.linhaRepository;
        this._validadorDeData = app.util.validadorDeData;
        this._clienteId = 209;
    }

    obter(req,res,next){
        let numero = req.query.numero; 
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        let linhaRepository = new this._LinhaRepository();

        linhaRepository
                .filtrarLinhas(this._clienteId,numero,dataAtualizacao)
                    .then(linhas => {
                        if(linhas)
                            res.json(linhas);  
                        else
                            res.sendStatus(204);
                    })
                    .catch(erro => next(erro));
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = (app) => new LinhaController(app)
