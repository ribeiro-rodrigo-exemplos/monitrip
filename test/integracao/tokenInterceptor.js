let request = require('supertest');
let app = require('../../config/express-config')();

let token = '';
let ssoService = require('../../app/servico/ssoService')();

describe('Testando TokenInterceptor',() => {
    
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
    
    it('#Consultando veículo sem enviar token',done => {
        request(app)
            .get('/v1/veiculos')
            .query('placa=0987a23')
            .timeout(30000)
            .expect(401)
            .end(done);
    });

    it('#Consultando veículo enviando token inválido',done => {
        request(app)
            .get('/v1/veiculos')
            .set('X-AUTH-TOKEN','uayatartararara')
            .query('placa=0987a23')
            .timeout(30000)
            .expect(401)
            .end(done);
    });

    it('#Consultando veículo enviando o token',done => {
        request(app)
            .get('/v1/veiculos')
            .set('X-AUTH-TOKEN',token)
            .query('placa=0987a23')
            .timeout(30000)
            .expect(204)
            .end(done);
    });
});