module.exports = function(app){

    let controlador = app.beans.factory.dispositivoController;

    app.post('/v1/dispositivos',controlador.cadastrar.bind(controlador));
    
}