let request = require('supertest');
let DatabaseCleaner = require('database-cleaner');
let app = require('../../config/express-config')();
let connectionFactory = require('../../app/database/connectionFactory')();
let VeiculoBuilder = require('../util/VeiculoBuilder');
let ValidadorDeAmbiente = require('../util/ValidadorDeAmbiente');

let databaseCleaner;
let veiculoTestDataBuilder; 

let connection = new connectionFactory();

describe('testando controlador veiculo.js',(done) => {
    
    before(done => {
        
        const validador = new ValidadorDeAmbiente();
        validador.validar();
        
        databaseCleaner = new DatabaseCleaner('mysql');
        done();
    });

    beforeEach(done => {
        databaseCleaner.clean(connection,()=>{
            
            veiculoTestDataBuilder = new VeiculoBuilder(connection);

            veiculoTestDataBuilder
                                .cliente('BRT-Teste')
                                .placa('AAA-222')
                                .descricaoDoTipo('Onibus novo')
                                .ativo(true)
                                .dataAtualizacao('2016-12-10')
                                .construir(done);
        });
    });
    
    it('consultando veiculo pela placa',done => {
        
         request(app)
                    .get('/v1/veiculos')
                    .query('placa=AAA-222')
                    .timeout(30000)
                    .expect('Content-Type', /json/)
                    .expect(res => res.body["dt_atualizacao"] = new Date(res.body["dt_atualizacao"]))
                    .expect(200,veiculoTestDataBuilder.veiculo)
                    .end(done);

    }); 

    it('consultando veiculo cuja a placa não existe',done => {
        request(app)
                    .get('/v1/veiculos')
                    .query('placa=0987a23')
                    .timeout(30000)
                    .expect(204)
                    .end(done);
    });

    it('consultando veiculo com modificação após a data',done => {
                
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2016-12-10')
                .timeout(30000)
                .expect(res => {
                    res.body[0]["dt_atualizacao"] = new Date(res.body[0]["dt_atualizacao"]);
                })
                .expect(200,[veiculoTestDataBuilder.veiculo])
                .end(done);
    });

    it('listando veiculos por dataAtualizacao sem veículo modificado após a data',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2018-02-01')
                .timeout(10000)
                .expect(204)
                .end(done);
    });

    it('listando veículos por placa e dataAtualizacao',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2016-12-10')
                .query('placa=AAA-222')
                .timeout(10000)
                .expect(res => res.body["dt_atualizacao"] = new Date(res.body["dt_atualizacao"]))
                .expect(200,veiculoTestDataBuilder.veiculo)
                .end(done);
    });

    it('listando veículo pela placa que não foi atualizado após a data de atualização',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2016-12-11')
                .query('placa=AAA-222')
                .timeout(10000)
                .expect(204)
                .end(done);
    });
});