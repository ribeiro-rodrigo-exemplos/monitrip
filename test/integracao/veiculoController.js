let request = require('supertest');
let DatabaseCleaner = require('database-cleaner');
let app = require('../../config/express-config')();
let connectionFactory = require('../../app/database/mysqlConnectionFactory')();
let VeiculoBuilder = require('../util/veiculoBuilder');
let ValidadorDeAmbiente = require('../util/validadorDeAmbiente');
let GenericDTO = require('../../app/util/dto/genericDTO')();
let moment = require('moment');

let databaseCleaner;
let veiculoTestDataBuilder; 

let connection = new connectionFactory();

describe('Testando VeiculoController',(done) => {
    
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
    
   it('#Consultando veiculo pela placa',done => {
        
        let dtoEsperado = new GenericDTO([veiculoTestDataBuilder.veiculo],'veiculos');
        dtoEsperado["dt_sincronismo"] = moment().format('YYYY-MM-DD')

         request(app)
                    .get('/v1/veiculos')
                    .query('placa=AAA-222')
                    .timeout(30000)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        let regexp = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
                        res.body["dt_sincronismo"] = regexp.exec(res.body['dt_sincronismo']).toString();
                    })
                    .expect(200,dtoEsperado)
                    .end(done);
    }); 

    /*it('#Consultando veiculo cuja a placa não existe',done => {
        request(app)
                    .get('/v1/veiculos')
                    .query('placa=0987a23')
                    .timeout(30000)
                    .expect(204)
                    .end(done);
    });

    it('#Consultando veiculo com modificação após a data',done => {
                
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

    it('#Listando veiculos por dataAtualizacao sem veículo modificado após a data',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2018-02-01')
                .timeout(10000)
                .expect(204)
                .end(done);
    });

    it('#Listando veículos por placa e dataAtualizacao',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2016-12-10')
                .query('placa=AAA-222')
                .timeout(10000)
                .expect(res => res.body[0]["dt_atualizacao"] = new Date(res.body[0]["dt_atualizacao"]))
                .expect(200,[veiculoTestDataBuilder.veiculo])
                .end(done);
    });

    it('#Listando veículo pela placa que não foi atualizado após a data de atualização',done => {
        request(app)
                .get('/v1/veiculos')
                .query('dataAtualizacao=2016-12-11')
                .query('placa=AAA-222')
                .timeout(10000)
                .expect(204)
                .end(done);
    }); */
});