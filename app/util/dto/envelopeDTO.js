const safira = require('safira');

class EnvelopeDTO{
    toDTO(result,labelResult){
        const retorno = {};
        retorno[labelResult] = result;
        return retorno;
    }
};

safira.define(EnvelopeDTO);
