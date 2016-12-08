//require('../../app/database/mongoConnectionFactory');
let mongoose = require('mongoose');
let request = require('supertest');
let app = require('../../app/config/express-config')();

describe('Testando controlador linha.js',() => {

   beforeEach(() => {
       
   });
   
    it('#Consultando linha pelo número',(done) => {
        request(app)
                .get('/v1/linhas')
                .query('numero=076')
                .timeout(30000)
                .expect('Content-Type',/json/)
                .expect((res) => res.body = {numero:res.body.numero})
                .expect(200,{numero:'076'})
                .end(done); 
    }); 
    

    it('#Consultando linha cujo o número não existe',(done) => {
        request(app)
                .get('/v1/linhas')
                .query('numero=000987')
                .timeout(30000)
                .expect(204)
                .end(done); 
    });

    it('#Consultando linhas com modificação após a data',(done) => {
        request(app)
                .get('/v1/linhas')
                .query('dataAtualizacao=2016-07-21')
                .timeout(30000)
                .expect('Content-Type',/json/)
                .expect(200)
                .end(done); 
    });

    it('#Listando linhas por dataAtualizacao sem linha modificada após a data',(done) => {
        request(app)
                .get('/v1/linhas')
                .query('dataAtualizacao=2020-07-21')
                .timeout(30000)
                .expect(204)
                .end(done); 
    });

    it('#Listando linhas por dataAtualizacao e número',(done) => {
        request(app)
                .get('/v1/linhas')
                .query('dataAtualizacao=2016-07-21')
                .query('numero=076')
                .timeout(30000)
                .expect('Content-Type',/json/)
                .expect(200)
                .end(done); 
    });

    it('#Listando linha pelo número e data de atualização, que não foi atualizada após a data',(done) => {

        request(app)
                .get('/v1/linhas')
                .query('dataAtualizacao=2020-07-21')
                .query('numero=076')
                .timeout(30000)
                .expect(204)
                .end(done);  
    });

    it('#Listando todas as linhas do cliente',(done) => {
        request(app)
                .get('/v1/linhas')
                .timeout(30000)
                .expect('Content-Type',/json/)
                .expect(200)
                .end(done);  
    });
}); 