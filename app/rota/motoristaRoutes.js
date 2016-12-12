module.exports = function(app){
    
    let controlador = app.controlador.motoristaController;

    app.get('/v1/motoristas',controlador.obter.bind(controlador));
}