let mongoose = require('mongoose');

let linhaSchema = mongoose.Schema({
    ultimaAtualizacao:Date,
    numero:String,
    tags:[]
});

mongoose.model('Linha',linhaSchema,'Linha');