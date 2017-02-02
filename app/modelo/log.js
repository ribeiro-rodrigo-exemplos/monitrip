let mongoose = require('mongoose');

let logSchema = mongoose.Schema({
    dataHoraEvento : Date,
    idLog : String,
    placaVeiculo : String
});

mongoose.model('Log', logSchema, 'logsMonitrip');