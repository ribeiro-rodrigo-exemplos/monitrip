var request = require('supertest');
var assert = require('assert');
var app = require('../../app/config/express-config')();

describe('Testando controlador motorista.js',function(){
    
    it('Consultando motorista pelo cpf existente',done =>{

        let motorista = [{
                            "nm_matricula": "19810",
                            "nm_nomeFuncionario": "Caroline Ferraira",
                            "nm_cpf": "13818873763",
                            "vl_sexo": "f",
                            "dt_atualizacao": "2016-12-08T02:00:00.000Z",
                            "fl_ativo": 0
                        }]
        
         request(app)
                    .get('/v1/motoristas')
                    .query('cpf=13818873763')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200, motorista)
                    .end(done);

    });

    it('Consultando motorista pela data de atualização',done => {

        let motorista = [{
                            "nm_matricula": "19810",
                            "nm_nomeFuncionario": "Caroline Ferraira",
                            "nm_cpf": "13818873763",
                            "vl_sexo": "f",
                            "dt_atualizacao": "2016-12-08T02:00:00.000Z",
                            "fl_ativo": 0
                        }]
        
         request(app)
                    .get('/v1/motoristas')
                    .query('dataAtualizacao=2016-12-07')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200, motorista)
                    .end(done);

    });

    it('Consultando motorista com cpf não existente',done => {
        request(app)
                    .get('/v1/motoristas')
                    .query('cpf=012367891')
                    .timeout(30000)
                    .expect(204)
                    .end(done);
    });

    it('Consultando motorista pela data de atualização não existente',done =>{
         request(app)
                    .get('/v1/motoristas')
                    .query('dataAtualizacao=2016-12-09')
                    .timeout(10000)
                    .expect(204)
                    .end(done);
    });
    
});