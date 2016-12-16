let moment = require('moment');

class ValidadorDeData{
    constructor(){}

    validar(data){
        try{
                        
            return moment(data,"YYYY-MM-DD",true).isValid();
            
        }catch(e){
            return false;
        }
    }
}

let validadorDeData = new ValidadorDeData();

module.exports = () => validadorDeData;