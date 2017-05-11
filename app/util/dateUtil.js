let moment = require('moment');
let momentTimezone = require('moment-timezone');
let log = require('./log');

const formato = {
    DATA_DMA_BARRA: 'DD/MM/YYYY',
    DATA_DMA_TRACO: 'DD-MM-YYYY',
    DATA_AMD_BARRA: 'YYYY/MM/DD',
    DATA_AMD_TRACO: 'YYYY-MM-DD',
    DATAHORA_DMA_BARRA: 'DD/MM/YYYY HH:mm:ss',
    DATAHORA_DMA_TRACO: 'DD-MM-YYYY HH:mm:ss',
    DATAHORA_AMD_BARRA: 'YYYY/MM/DD HH:mm:ss',
    DATAHORA_AMD_TRACO: 'YYYY-MM-DD HH:mm:ss',
    DATA_COMPLETA_MDA_BARRA: 'DD/MM/YYYY HH:mm:ss:sss',
    DATA_COMPLETA_AMD_BARRA: 'YYYY/MM/DD HH:mm:ss:sss',
    HORA_MIN: 'HH:mm:ss',
    HORA_MIN_SEG: 'HH:mm:ss',
    HORA_COMPLETA: 'HH:mm:ss:sss'
};

const tipoRetorno = {
    DATA: 1,
    STRING: 2
};

class DateUtil{
    constructor(){
        this._formato = formato;
        this._tipoRetorno = tipoRetorno;
    }

    validar(data, formato){
        try{                       
            return moment(data, formato, true).isValid();           
        }
        catch(e){
            log.erro(e);

            return false;
        }
    }

    formataDataHora(dataHora, timezone, format, tipo) {
        if(!format) format = formato.DATAHORA_DMA_BARRA;
        if(!timezone) timezone = 'America/Sao_Paulo';
        if(!tipo) tipo = tipoRetorno.STRING;

        return this.aplicaTimeZone(dataHora, format, timezone, tipo);
    }

    aplicaTimeZone(dataHora, format, timezone, tipo){
        let dh = momentTimezone.tz(dataHora, timezone);

        return (tipo === tipoRetorno.STRING) ? dh.format(format) : dh.toDate();
    }

    get formato(){
        return this._formato;
    }

    get tipoRetorno(){
        return this._tipoRetorno;
    }

    getMesVigente(data){
        return moment.months()[moment(data).format('M') -1];
    }
}

module.exports = () => DateUtil;