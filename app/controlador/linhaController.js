class LinhaController{
    constructor(app){
        this._LinhaRepository = app.repositorio.linhaRepository;
        this._validadorDeData = app.util.validadorDeData;
        this._clienteId = 209;
    }

    obter(req,res){
        let numero = req.query.numero; 
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._LinhaRepository
                .filtrarLinhas(this._clienteId,numero,dataAtualizacao)
                    .then(linhas => {
                        if(linhas)
                            res.json(linhas);
                        else
                            res.sendStatus(204);
                    })
                    .catch(erro => 
                                    res.status(500)
                                        .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde')
                          );
    }

    _dataValida(dataAtualizacao){
        return this._validadorDeData.validar(dataAtualizacao);
    }
}

module.exports = (app) => new LinhaController(app)
