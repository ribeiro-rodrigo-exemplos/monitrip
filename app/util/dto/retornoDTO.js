let moment = require("moment");

class RetornoDTO{
    constructor(result,labelResult){
        this["dt_sincronismo"] = moment().format('YYYY-MM-DD HH:mm:ss');
        this[labelResult] = result;
    }
}

module.exports = () => RetornoDTO;

