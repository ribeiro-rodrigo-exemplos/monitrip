module.exports = function(app){
    
    let controlador = app.controlador.logController;

    app.get('/v1/logs',controlador.criar);
}