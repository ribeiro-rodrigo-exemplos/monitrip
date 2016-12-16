class RetornoDTO{
    constructor(){}
     
    getRetornoDefault(tipoRetorno, listRetorno, util){
        this["data"] = new Date();
        this[tipoRetorno] = listRetorno;

        return this;
    }     
}

module.exports = () => RetornoDTO;