module.exports = function(app){
    
    let controlador = app.controladores.veiculo;

    app.get('/v1/veiculos',controlador.obterVeiculo);
}