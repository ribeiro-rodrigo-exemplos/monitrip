module.exports = function(app){
    
    let controlador = app.beans.factory.logController;

    app.post('/api/v1/logs',controlador.inserirLog.bind(controlador));
}