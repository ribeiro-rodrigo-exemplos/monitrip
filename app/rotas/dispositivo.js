module.exports = function(app){

    let controlador = app.controladores.dispositivo;

    app.post('/v1/dispositivos',controlador.cadastrar);
    
}