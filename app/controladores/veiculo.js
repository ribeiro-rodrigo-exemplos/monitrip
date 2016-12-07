module.exports = function(app){

    let controlador = {};

    controlador.obter = (req,res) => {

        let connection = new app.database.connectionFactory();
        let veiculoDAO = new app.database.veiculoDAO(connection);
        let idCliente = 154 //teste

        let placa = req.query.placa;
        let dataAtualizacao = req.query.dataAtualizacao;

        let promise;

        if(dataAtualizacao && placa)
            promise = veiculoDAO.listarVeiculosPorPlacaEDataAtualizacao(placa,dataAtualizacao);
        else
            if(dataAtualizacao)
                promise = veiculoDAO.listarVeiculosPorDataAtualizacao(dataAtualizacao);
                else
                    if(placa)
                        promise = veiculoDAO.obterVeiculoPelaPlaca(placa);
                    else
                        promise = veiculoDAO.listarVeiculosDoCliente(idCliente);

        promise
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

        connection.end();
    }

    return controlador;
}

