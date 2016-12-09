let moment = require('moment');

class ValidadorDeData{
    constructor(){}

    validar(data){
        try{
            return moment(data).isValid();
        }catch{
            return false;
        }
    }
}

let validadorDeData = new ValidadorDeData();

module.exports = () => validadorDeData;