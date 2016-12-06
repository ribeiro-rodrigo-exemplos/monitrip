var request = require('supertest');
var app = require('../../app/config/express-config')();

describe('testando controlador veiculo.js',function(){
    
    it('consultando veiculos pela placa',function(done){
        
         request(app)
                    .get('/v1/veiculos')
                    .timeout(10000)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(done);

    });

    it('consultando veiculo com placa inexistente',function(){

    });

    it('consultando veiculo por data de modificação',function(){

    });
});