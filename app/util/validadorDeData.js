let moment = require('moment');
const safira = require('safira');

class ValidadorDeData {
    constructor() {
    }

    validarData(data) {
        return this._validar(data, "YYYY-MM-DD");
    }

    validarDataEHora(data) {
        return this._validar(data, "YYYY-MM-DD HH:mm:ss");
    }

    _validar(data, pattern) {
        try {

            return moment(data, pattern, true).isValid();

        } catch (e) {
            return false;
        }
    }
};

safira.define(ValidadorDeData);



