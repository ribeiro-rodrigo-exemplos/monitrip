module.exports = function(app){
    
    let controlador = app.beans.factory.motoristaController;

    app.get('/api/v1/motoristas',controlador.obter.bind(controlador));
}