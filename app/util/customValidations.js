let validator = require('express-validator');
const safira = require('safira');

class CustomValidations{

    constructor(app,validadorDeData){
        this._app = app;
        this._validadorDeData = validadorDeData;
    }
    
    created(){
        const isDate = this.isDate.bind(this);
        const isDateTime = this.isDateTime.bind(this);

        this._app.use(validator({
            customValidators:{
                isDate:isDate,
                isDateTime:isDateTime
            }
        }));
    }

    isDate(value){
        return this._validadorDeData.validarData(value);
    }

    isDateTime(value){
        return this._validadorDeData.validarDataEHora(value) || this._validadorDeData.validarData(value);
    }
}

safira.define(CustomValidations)
        .build()
        .eager();