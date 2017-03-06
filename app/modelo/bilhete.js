/**
 * Created by rodrigo on 23/02/17.
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    'dt_atualizacao':String,
    identificacaoLinha:String,
    numeroBilheteEmbarque:String,
    cnpjEmpresa:String,
    informacoesPassageiro:{
        nomePassageiro:String,
        documentoIdentificacaoPassageiro:String
    }
});

mongoose.model("Bilhete",schema,"Bilhetes");