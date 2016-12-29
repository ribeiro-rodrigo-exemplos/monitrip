let moment = require('moment');

module.exports = () =>
    class ValidadorDeData{
        constructor(){}

        validar(data){
            try{
                            
                return moment(data,"YYYY-MM-DD HH:mm:ss",true).isValid();
                
            }catch(e){
                return false;
            }
        }
    }

