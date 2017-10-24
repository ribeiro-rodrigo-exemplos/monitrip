const safira = require('safira');

const datasource = safira.bean('monitriipDatasource');

let logSchema = datasource.Schema({
    dataHoraEvento: String,
    idLog: Number,
    placaVeiculo: String
});

let log = datasource.model('Log', logSchema, 'logsMonitrip');

safira.defineObject(log, 'log');