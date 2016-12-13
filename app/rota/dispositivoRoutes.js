module.exports = function(app){

    let controlador = app.controlador.dispositivo;

    app.post('/v1/dispositivos',controlador.cadastrar);
    
}