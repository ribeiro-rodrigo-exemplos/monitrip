module.exports = function(app){
    
    let controlador = app.beans.factory.logController;

    app.post('/api/v1/logs',controlador.inserirLog.bind(controlador));
    app.get('/web/v1/logs',controlador.obterLogs.bind(controlador));
}