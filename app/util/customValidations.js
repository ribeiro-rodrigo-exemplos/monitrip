/**
 * Created by rodrigo on 20/02/17.
 */

let validadorDeData = new (require('./validadorDeData')());
console.log(validadorDeData._validar);

module.exports = () => {
    return {
        isDate: value => validadorDeData.validarData(value)
    }
}
