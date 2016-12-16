let RetornoDTO = require('./retornoDTO')();

class RetornoLinhaDTO extends RetornoDTO{
    constructor(){
        super();
    }
}

module.exports = () => RetornoLinhaDTO;