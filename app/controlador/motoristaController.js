class MotoristaController{
    constructor(app){
        this._MotoristaRepository = app.repositorio.motoristaRepository;
        this._validadorDeData = app.util.validadorDeData;
        this._cliente = 209;
    }

    obter(req,res){
        let cpf = req.query.cpf;
        let dataAtualizacao = req.query.dataAtualizacao;

        if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
            res.sendStatus(204);
            return;
        }

        this._MotoristaRepository
                .filtrarMotoristas(this._cliente,cpf,dataAtualizacao)
                    .then(motoristas => {
                        if(!motoristas){
                            res.sendStatus(204);
                            return;
                        }

                        res.json(motoristas);
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

module.exports = app => new MotoristaController(app); 

