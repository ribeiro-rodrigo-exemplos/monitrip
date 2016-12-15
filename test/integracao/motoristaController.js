var request = require('supertest');
var assert = require('assert');
let moment = require('moment');
var app = require('../../config/express-config')();

describe('Testando controlador motorista.js',function(){
    
    it('Consultando motorista pelo cpf existente',done =>{
        let dataBusca = moment().format('DD-MM-YYYY');

        let motorista = {
                            "data": dataBusca,
                            "motoristas": [
                                {
                                    "nm_nomeFuncionario": "Caroline Ferraira",
                                    "nm_cpf": "13818873763",
                                    "dt_atualizacao": "2016-12-08T02:00:00.000Z",
                                    "fl_ativo": 0
                                }
                            ]
                        }
        
         request(app)
                    .get('/v1/motoristas')
                    .query('cpf=13818873763')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200, motorista)
                    .end(done);

    });

    it('Consultando motorista pela data de atualização',done => {
         request(app)
                    .get('/v1/motoristas')
                    .query('dataAtualizacao=2016-12-07')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200)
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