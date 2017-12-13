const safira = require('safira');

class LogDTO{
    constructor(){}

    toDTO(collection,action,data){
        return {
            collection:collection,
            action:action,
            data:data
        }
    }
};

safira.define(LogDTO);