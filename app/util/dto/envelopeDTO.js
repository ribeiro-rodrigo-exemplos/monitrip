const safira = require('safira');

class EnvelopeDTO{
    toDTO(result,labelResult){
        return {
            labelResult:result
        };
    }
};

safira.define(EnvelopeDTO);
