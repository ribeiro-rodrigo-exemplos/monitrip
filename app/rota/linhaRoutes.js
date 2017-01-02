module.exports = function(app){
    
    let controlador = app.beans.factory.linhaController;

    app.get('/api/v1/linhas',controlador.obter.bind(controlador));
}