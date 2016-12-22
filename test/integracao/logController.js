let request = require('supertest');
let app = require('../../config/express-config')();
let logBuilder = require('../util/logBuilder');

let token = '';
let ssoService = require('../../app/servico/ssoService')();

describe('Testando logController',() => {
        
    before(done => {
        ssoService.autenticar({usuario:'teste',senha:'123456'})
        .then(result => {
            token = result.IdentificacaoLogin;
            done();
        })
        .catch(erro => {
            throw new Error(erro.message);
        });
    });
    
    it('#Inserindo logs de viagens fretadas',done =>{
        request(app)
            .post('/v1/logs/viagens/fretadas')
            .set('X-AUTH-TOKEN',token)
            .send(logBuilder.criarLogDeViagemFretada())
            .expect(202)
            .end(done)        
    });

    it('#Inserindo logs de viagens fretadas sem id',done =>{
        
        let log = logBuilder.criarLogDeViagemFretada();
        delete log.idLog;

        request(app)
            .post('/v1/logs/viagens/fretadas')
            .set('X-AUTH-TOKEN',token)
            .send(log)
            .expect(422)
            .end(done)        
    });

    it('#Inserindo logs de viagens regulares',done =>{
        request(app)
            .post('/v1/logs/viagens/regulares')
            .set('X-AUTH-TOKEN',token)
            .send(logBuilder.criarLogDeViagemRegular())
            .expect(202)
            .end(done)   
    });

    it('#Inserindo logs de viagens regulares sem id',done =>{
        
        let log = logBuilder.criarLogDeViagemRegular();
        delete log.idLog;
        
        request(app)
            .post('/v1/logs/viagens/regulares')
            .set('X-AUTH-TOKEN',token)
            .send(log)
            .expect(422)
            .end(done)   
    });

    it('#Inserindo logs de detector parada',done =>{
        request(app)
            .post('/v1/logs/viagens/detectorParada')
            .set('X-AUTH-TOKEN',token)
            .send(logBuilder.criarLogDeDetectorDeParada())
            .expect(202)
            .end(done)   
    });

    it('#Inserindo logs de detector parada sem id',done =>{
        
        let log = logBuilder.criarLogDeDetectorDeParada();
        delete log.idLog;
        
        request(app)
            .post('/v1/logs/viagens/detectorParada')
            .set('X-AUTH-TOKEN',token)
            .send(log)
            .expect(422)
            .end(done)   
    });

    it('#Inserindo logs de jornada de trabalho dos motoristas',done =>{
        request(app)
            .post('/v1/logs/jornadas/motoristas')
            .set('X-AUTH-TOKEN',token)
            .send(logBuilder.criarLogDeJornadaDosMotoristas())
            .expect(202)
            .end(done)   
    });

    it('#Inserindo logs de jornada de trabalho dos motoristas sem id',done =>{
        
        let log = logBuilder.criarLogDeJornadaDosMotoristas();
        delete log.idLog;
        
        request(app)
            .post('/v1/logs/jornadas/motoristas')
            .set('X-AUTH-TOKEN',token)
            .send(log)
            .expect(422)
            .end(done)   
    });

    it('#Inserindo logs de velocidade e localização',done =>{
        request(app)
            .post('/v1/logs/velocidadeTempoLocalizacao')
            .set('X-AUTH-TOKEN',token)
            .send(logBuilder.criarLogDeVelocidadeELocalizacao())
            .expect(202)
            .end(done)   
    });

    it('#Inserindo logs de velocidade e localização sem id',done =>{
        
        let log = logBuilder.criarLogDeVelocidadeELocalizacao();
        delete log.idLog;
        
        request(app)
            .post('/v1/logs/velocidadeTempoLocalizacao')
            .set('X-AUTH-TOKEN',token)
            .send(log)
            .expect(422)
            .end(done)   
    });
});