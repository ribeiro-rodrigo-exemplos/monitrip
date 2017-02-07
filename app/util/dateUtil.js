let moment = require('moment');
let log = require('./app/util/log');

const formato = {
    DATA_DMA_BARRA: 'dd/MM/yyyy',
    DATA_DMA_TRACO: 'dd-MM-yyyy',
    DATA_AMD_BARRA: 'yyyy/MM/dd',
    DATA_AMD_TRACO: 'yyyy-MM-dd',
    DATAHORA_DMA_BARRA: 'dd/MM/yyyy hh:mm:ss',
    DATAHORA_DMA_TRACO: 'dd-MM-yyyy hh:mm:ss',
    DATAHORA_AMD_BARRA: 'yyyy/MM/dd hh:mm:ss',
    DATAHORA_AMD_TRACO: 'yyyy-MM-dd hh:mm:ss',
    DATA_COMPLETA_MDA_BARRA: 'dd/MM/yyyy hh:mm:ss:sss',
    DATA_COMPLETA_AMD_BARRA: 'yyyy/MM/dd hh:mm:ss:sss',
    HORA_MIN: 'hh:mm:ss',
    HORA_MIN_SEG: 'hh:mm:ss',
    HORA_COMPLETA: 'hh:mm:ss:sss'
}

const tipoRetorno = {
    DATA: 1,
    STRING: 2
}

class DateUtil{
    constructor(){
        this._meses = new Array("Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
    }

    validar(data){
        try{                       
            return moment(data, "YYYY-MM-DD", true).isValid();           
        }
        catch(e){
            log.debug(e);
            log.info(e);

            return false;
        }
    }

    formataDataHora(dataHora, format, timezone, tipo) {
        if(!format) format = formato.DATAHORA_AMD_BARRA;
        if(!timezone) timezone = 'America/Sao_Paulo';
        if(!tipo) tipo = tipoRetorno.STRING;
    }
}