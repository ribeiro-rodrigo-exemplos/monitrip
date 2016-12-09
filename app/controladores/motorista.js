module.exports = function(app){

    let controlador = {};

    controlador.obter = (req,res) => {

        let connection = new app.database.connectionFactory();
        let motoristaDAO = new app.database.motoristaDAO(connection);

        var cpf = req.query.cpf;
        var dataAtualizacao = req.query.dataAtualizacao;

        //var cpf = "1381887376as";
        //var dataAtualizacao = "w";
        var cliente = 209;

        if(dataAtualizacao){
            if(!app.util.validadorDeData.validar(dataAtualizacao)){
                res.sendStatus(204);
                return;
            }
        }
       
        if (cpf && dataAtualizacao){
            motoristaDAO.obter(cliente, cpf, dataAtualizacao)
                    .then( motorista => {
                        if (!motorista.length){
                            res.sendStatus(204);
                        }else{
                            res.json(motorista);
                        }

                    })
                    .catch(erro => res.sendStatus(500));
        }
        
        if (!cpf && !dataAtualizacao){
            motoristaDAO.obterTodos(cliente)
                    .then( motorista => {
                        if(!motorista.length){
                            res.sendStatus(204);
                        }else{
                            res.json(motorista);
                        }
                    })
                    .catch(erro => res.sendStatus(500));
        }

        if (cpf && !dataAtualizacao){
            motoristaDAO.obterPorCpf(cliente, cpf)
                    .then( motorista => {
                        if(!motorista.length){
                            res.sendStatus(204);
                        }else{
                            res.json(motorista);
                        }
                    })
                    .catch(erro => res.sendStatus(500));
        }
        
        if (dataAtualizacao && !cpf){
            motoristaDAO.obterPorDataAtualizacao(cliente, dataAtualizacao)
                    .then( motorista => {
                        if(!motorista.length){
                            res.sendStatus(204);
                        }else{
                            res.json(motorista);
                        }
                    })
                    .catch(erro => res.sendStatus(500));
        }

        connection.end();
}

    return controlador;
}

