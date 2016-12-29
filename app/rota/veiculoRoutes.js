module.exports = app => {
    
    let controlador = app.beans.factory.veiculoController;

    app.get('/v1/veiculos',controlador.obter.bind(controlador));
}