var request = require('supertest');
var assert = require('assert');
let moment = require('moment');
var app = require('../../config/express-config')();
let dateBuilder = require('../util/dateBuilder');
let GenericDTO = require('../../app/util/dto/genericDTO')();

describe('Testando controlador motorista.js',function(){
    
    it('Consultando motorista pelo cpf existente',done =>{

        let motorista = {
                            "dt_sincronismo": "",
                            "motoristas":
                            [
                                {
                                    "nm_nomeFuncionario": "Caroline Ferraira",
                                    "nm_cpf": "13818873763",
                                    "fl_ativo": 0
                                }
                            ]
                        }               
                        

        dtoEsperado = new GenericDTO(motorista,'motoristas');
        dtoEsperado["dt_sincronismo"] = dateBuilder.obterDataAtual();

        request(app)
                    .get('/v1/motoristas')
                    .query('cpf=13818873763')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(res => res.body['dt_sincronismo'] = dateBuilder.extrairDataSincronismo(res.body))
                    .end(done);

    });

    it('Consultando motorista pela data de atualização',done => {
         request(app)
                    .get('/v1/motoristas')
                    .query('dataAtualizacao=2016-12-07+17:29:54')
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
                    .query('dataAtualizacao=2050-12-09')
                    .timeout(10000)
                    .expect(204)
                    .end(done);
    });
    
}); 