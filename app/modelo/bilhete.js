const safira = require('safira');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    dt_atualizacao: String,
    identificacaoLinha: String,
    numeroBilheteEmbarque: String,
    cnpjEmpresa: String,
    dataHoraEvento: String,
    informacoesPassageiro: {
        nomePassageiro: String,
        documentoIdentificacaoPassageiro: String
    }
});

let bilhete = mongoose.model("Bilhete", schema, "Bilhetes");

safira.defineObject(bilhete, 'bilhete');