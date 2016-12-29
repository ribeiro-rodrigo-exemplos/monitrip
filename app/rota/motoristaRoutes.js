module.exports = function(app){
    
    let controlador = app.beans.factory.motoristaController;

    app.get('/v1/motoristas',controlador.obter.bind(controlador));
}