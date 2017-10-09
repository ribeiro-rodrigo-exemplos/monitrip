let moment = require("moment");

module.exports = () => 
    class RetornoDTO{
        constructor(result,labelResult){
            this[labelResult] = result;
        }
    };


