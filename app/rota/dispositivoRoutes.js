module.exports = function(app){

    let controlador = app.controlador.dispositivoController;

    app.post('/v1/dispositivos',controlador.cadastrar.bind(controlador));
    
}