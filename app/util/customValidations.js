let validator = require('express-validator');
const safira = require('safira');

class CustomValidations{

    constructor(app,validadorDeData){
        this._app = app;
        this._validadorDeData = validadorDeData;
    }
    
    created(){
        this._app.use(validator({
            customValidators:{
                isDate:this._isDate,
                isDateTime:this._isDateTime
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