let mongoose = require('mongoose');
const safira = require('safira');

let linhaSchema = mongoose.Schema({
    ultimaAtualizacao: Date,
    numero: String,
    tags: []
});

let linha = mongoose.model('Linha', linhaSchema, 'Linha');

safira.defineObject(linha, 'linha');
