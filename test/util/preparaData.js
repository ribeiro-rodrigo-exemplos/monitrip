class PreparaData{
    constructor(res){
        this.expressaoRegular = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);

        return expressaoRegular.exec(res.body['dt_sincronismo']).toString();
    
    }
}

module.exports = () => GenericDTO;


