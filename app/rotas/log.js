module.exports = function(app){
    
    let controlador = app.controladores.log;

    app.get('/v1/logs',controlador.criar);
}