let moment = require('moment');

class DateBuilder{
    constructor(){}

    obterDataAtual(){
        return moment().format('YYYY-MM-DD');
    }

    extrairDataSincronismo(body){
        let regexp = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
        return regexp.exec(body['dt_sincronismo']).toString();
    }
}

module.exports = new DateBuilder();