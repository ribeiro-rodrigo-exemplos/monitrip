module.exports = function(app){
    
    let controlador = app.controladores.motorista;

    app.get('/v1/motorista',controlador.obter);
}