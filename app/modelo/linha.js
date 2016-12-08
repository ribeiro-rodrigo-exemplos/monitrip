let mongoose = require('mongoose');

let linhaSchema = mongoose.Schema({
    ultimaAtualizacao:Date,
    numero:String
});

mongoose.model('Linha',linhaSchema,'Linha');