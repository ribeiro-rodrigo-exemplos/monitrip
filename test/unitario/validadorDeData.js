let validadorDeData = require('../../app/util/validadorDeData')();
let assert = require('assert');

describe('Testando a classe ValidadorDeData',() => {
    it('#Testando com uma data valida',() => {
        assert(true == validadorDeData.validar('2016-03-23 17:29:54'));
    });

    it('#Testando data com dia inválido',() => {
        assert(false == validadorDeData.validar('2016-02-30 17:29:54'));
    });

    it('#Testando data com mês inválido',() => {
        assert(false == validadorDeData.validar('2016-00-01 17:29:54'));
    });

    it('#Testando data completamente inválida',() => {
        assert(false == validadorDeData.validar('00-00-00 17:29:54'))
    });

    it('#Testando data com dia inexistente',() => {
        assert(false == validadorDeData.validar('2016-03-32 17:29:54'));
    });

    it('#Testando data fora do formato',() => {
        assert(false == validadorDeData.validar('2016--01/02 17:29:54'));
    }); 
})