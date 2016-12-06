module.exports = function(app){
    
    let controlador = app.controladores.linha;

    app.get('/v1/linhas',controlador.obter);
}