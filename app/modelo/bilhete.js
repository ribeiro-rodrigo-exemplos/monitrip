const safira = require('safira');

const datasource = safira.bean('monitriipDatasource');

const schema = datasource.Schema({
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

let bilhete = datasource.model("Bilhete", schema, "Bilhetes");

safira.defineObject(bilhete, 'bilhete');