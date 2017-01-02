module.exports = app => {
    
    let controlador = app.beans.factory.veiculoController;

    app.get('/api/v1/veiculos',controlador.obter.bind(controlador));
}