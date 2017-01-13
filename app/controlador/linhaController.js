module.exports = () =>
    class LinhaController{
        constructor(linhaRepository,validadorDeData,retornoDTO){
            this._LinhaRepository = linhaRepository;
            this._validadorDeData = validadorDeData;
            this._RetornoDTO = retornoDTO;
        }

        obter(req,res,next){
            let numero = req.query.numero; 
            let dataAtualizacao = req.query.dataAtualizacao;

            if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
                res.sendStatus(204);
                return;
            }


            this._LinhaRepository
                    .filtrarLinhas(req.idCliente,numero,dataAtualizacao)
                        .then(linhas =>
                            linhas.map(linha => {
                                if(linha.tags)
                                    linha.tipo = linha.tags.some(trajeto => trajeto.NAME == "FRETADA") ? "FRETADA" : "REGULAR";

                                delete linha.tags;
                                return linha;
                            })
                        )
                        .then(linhas => {
                            if(linhas){
                                linhas = new this._RetornoDTO(linhas,'linhas');
                                res.json(linhas);  
                            }
                            else
                                res.sendStatus(204);
                        })
                        .catch(erro => next(erro));
        }

        _dataValida(dataAtualizacao){
            return this._validadorDeData.validar(dataAtualizacao);
        }
    }


