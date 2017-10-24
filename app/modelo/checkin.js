const safira = require('safira');

const datasource = safira.bean('monitriipDatasource');

const schema = datasource.Schema({
    dataHoraEvento:String,
    bilhete:Object
},{
    versionKey:false
});

let checkin = datasource.model('Checkin',schema,'CheckinBilhetes');

safira.defineObject(checkin, 'checkin');

