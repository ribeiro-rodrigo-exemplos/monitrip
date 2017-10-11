let mongoose = require('mongoose');
const safira = require('safira');
mongoose.set('debug', false);

let sequelize = require('../database/sso')();

let logSchema = mongoose.Schema({
    dataHoraEvento: String,
    idLog: Number,
    placaVeiculo: String
});

let log = mongoose.model('Log', logSchema, 'logsMonitrip');

safira.defineObject(log, 'log');