let mongoose = require('mongoose');
const safira = require('safira');

let logSchema = mongoose.Schema({
    dataHoraEvento: String,
    idLog: Number,
    placaVeiculo: String
});

let log = mongoose.model('Log', logSchema, 'logsMonitrip');

safira.defineObject(log, 'log');