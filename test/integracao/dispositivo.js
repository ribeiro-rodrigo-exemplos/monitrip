/*var request = require('supertest');
var assert = require('assert');
var app = require('../../config/express-config')();

describe('Testando controlador dispositivo.js',function(){
    
    let dispositivo1 =      {
                                "imei": 1,
                                "descricao": "testando",
                                "excluido": 0
                            }

    let dispositivo2 =      {
                                "imei": 2,
                                "descricao": "testando",
                                "excluido": 0
                            }

    let dispositivo3 =      {
                                "imei": "",
                                "descricao": "testando",
                                "excluido": 0
                            }
    
    let dispositivo4 =      {
                                "imei": "3",
                                "descricao": "",
                                "excluido": 0
                            }


  
    it('Cadastrando imei válido e com licença.',done =>{

        request(app)
                    .post('/v1/dispositivos')
                    .timeout(30000)
                    .send(dispositivo1)
                    .expect(200)
                    .end(done);

    });

    it('Cadastrando imei válido e sem licença.', done =>{

        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo2)
                    .expect(422)    
                    .end(done);
    });

    it('Cadastrando imei já cadastrado e não excluido.', done =>{

        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo1)
                    .expect(422)
                    .end(done);
    });

    it('Cadastrando imei já cadastrado, excluido e com licença.', done =>{

        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo1)
                    .expect(200)
                    .end(done);
    });

    it('Cadastrando imei já cadastrado, excluido e sem licença.', done =>{
        
        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo1)
                    .expect(422)
                    .end(done);
    });

    it('Cadastrando imei vazio.', done =>{

        let expectativa =   [
                                {
                                    "param": "imei",
                                    "msg": "imei obrigatório",
                                    "value": ""
                                }
                            ]
                            
        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo3)
                    .expect(422, expectativa)
                    .end(done);
    });

<<<<<<< HEAD:test/controladores/dispositivo.js

    it('Cadastrando descrição vazia.', done =>{

        let expectativa =   [
                                {
                                    "param": "descricao",
                                    "msg": "descrição é obrigatória",
                                    "value": ""
                                }
                            ]
                            
        request(app)
                    .post('/v1/dispositivos')
                    .send(dispositivo4)
                    .expect(422, expectativa)
                    .end(done);
    });


});
=======
}); */
>>>>>>> temp:test/integracao/dispositivo.js

