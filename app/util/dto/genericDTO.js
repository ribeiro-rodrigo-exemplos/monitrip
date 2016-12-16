let moment = require("moment");

class GenericDTO{
    constructor(result,labelResult){
        this["dt_sincronismo"] = moment().format('YYYY-MM-DD HH:mm:ss');
        this[labelResult] = result;
    }
}

module.exports = () => GenericDTO;

