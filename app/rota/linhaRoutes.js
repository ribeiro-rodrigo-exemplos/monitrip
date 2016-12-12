module.exports = function(app){
    
    let controlador = app.controlador.linhaController;

    app.get('/v1/linhas',controlador.obter.bind(controlador));
}