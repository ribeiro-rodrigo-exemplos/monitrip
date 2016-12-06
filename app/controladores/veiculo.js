module.exports = function(app){

    let controlador = {};

    controlador.obter = (req,res) => {

        let connection = new app.database.connectionFactory();
        let veiculoDAO = new app.database.veiculoDAO(connection);

        veiculoDAO.listarVeiculos()
                    .then( veiculos => {
                        console.log(veiculos);
                        res.json(veiculos);
                    })
                    .catch(erro => res.sendStatus(500));

    }

    return controlador;
}

