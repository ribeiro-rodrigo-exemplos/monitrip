/**
 * Created by rodrigo on 20/02/17.
 */

let validadorDeData = new (require('./validadorDeData')());

module.exports = () => {
    return {
        isDate: value => validadorDeData.validarData(value),
        isDateTime: value => validadorDeData.validarDataEHora(value) || validadorDeData.validarData(value)
    }
};
