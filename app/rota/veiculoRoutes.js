module.exports = function(app){
    
    let controlador = app.controlador.veiculoController;

    app.get('/v1/veiculos',controlador.obter.bind(controlador));
}