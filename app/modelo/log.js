let mongoose = require('mongoose');
mongoose.set('debug', false);

let logSchema = mongoose.Schema({
    dataHoraEvento : String,
    idLog : Number,
    placaVeiculo : String
});

mongoose.model('Log', logSchema, 'logsMonitrip');