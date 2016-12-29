module.exports = () =>
    class MotoristaController{
        constructor(motoristaRepository,validadorDeData,retornoDTO){
            this._motoristaRepository = motoristaRepository;
            this._validadorDeData = validadorDeData;

            this._RetornoDTO = retornoDTO;
        }

        obter(req,res,next){
            
            let cpf = req.query.cpf;
            let dataAtualizacao = req.query.dataAtualizacao;
            
            if(dataAtualizacao && !this._dataValida(dataAtualizacao)){
                res.sendStatus(204);
                return;
            }

            this._motoristaRepository
                    .filtrarMotoristas(req.idCliente,cpf,dataAtualizacao)
                        .then(data => {
                            if(!data){
                                res.sendStatus(204);
                                return;
                            }
                            
                            res.json(new this._RetornoDTO(data,'motoristas'));
                        })
                        .catch(erro => next(erro));
        }

        _dataValida(dataAtualizacao){
            return this._validadorDeData.validar(dataAtualizacao);
        }
    }


