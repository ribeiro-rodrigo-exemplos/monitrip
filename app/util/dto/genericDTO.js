class GenericDTO{
    constructor(result,labelResult){
        this["dt_sincronismo"] = new Date();
        this[labelResult] = result;
    }
}

module.exports = () => GenericDTO;