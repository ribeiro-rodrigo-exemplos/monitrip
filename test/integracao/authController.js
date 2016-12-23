let request = require('supertest');
let app = require('../../config/express-config')();

describe('Testando authController',() => {

    it('#Gerando token com nome de usuario e senha corretos',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste',senha:'123456',imei:'666'})
            .expect(res => {
                if(!res.body.IdentificacaoLogin)
                    throw new Error('Token não veio na resposta');
            })
            .expect(200)
            .end(done);
    });

    it('#Gerando token com nome de usuário incorreto',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste222',senha:'123456',imei:'666'})
            .expect(res => {
                if(res.body.IdentificacaoLogin)
                    throw new Error('Token veio na resposta');
            })
            .expect(401)
            .end(done);
    });

    it('#Gerando token com senha incorreta',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste',senha:'123456678',imei:'666'})
            .expect(res => {
                if(res.body.IdentificacaoLogin)
                    throw new Error('Token veio na resposta');
            })
            .expect(401)
            .end(done);
    });

    it('#Gerando token com imei incorreto',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste',senha:'123456',imei:'6667'})
            .expect(res => {
                if(res.body.IdentificacaoLogin)
                    throw new Error('Token veio na resposta');
            })
            .expect(401)
            .end(done);
    });

    it('#Gerando token com nome de usuário e senha incorretos',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste222',senha:'1234566788',imei:'666'})
            .expect(res => {
                if(res.body.IdentificacaoLogin)
                    throw new Error('Token veio na resposta');
            })
            .expect(401)
            .end(done);
    });

    it('#Gerando token com nome de usuário, senha e imei incorretos',done => {
        request(app)
            .post('/auth')
            .timeout(30000)
            .send({usuario:'teste222',senha:'1234566788',imei:'666999'})
            .expect(res => {
                if(res.body.IdentificacaoLogin)
                    throw new Error('Token veio na resposta');
            })
            .expect(401)
            .end(done);
    });
}); 