module.exports = function(app){
    
    let controlador = app.beans.factory.logController;

    app.post('/v1/logs/viagens/fretadas',controlador.inserirLogDeViagemFretada.bind(controlador));
    app.post('/v1/logs/viagens/regulares',controlador.inserirLogDeViagemRegular.bind(controlador));
    app.post('/v1/logs/viagens/detectorParada',controlador.inserirLogDeDetectorDeParada.bind(controlador));
    app.post('/v1/logs/jornadas/motoristas',controlador.inserirLogDeJornadaDeTrabalho.bind(controlador));
    app.post('/v1/logs/velocidadeTempoLocalizacao',controlador.inserirLogDeVelocidadeELocalizacao.bind(controlador));
}