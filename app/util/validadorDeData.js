let moment = require('moment');

class ValidadorDeData{
    constructor(){}

    validar(data){
        try{
            return moment(data).isValid();
        }catch(e){
            return false;
        }
    }
}

let validadorDeData = new ValidadorDeData();

module.exports = () => validadorDeData;