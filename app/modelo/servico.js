const safira = require('safira');

const datasource = safira.bean('monitriipDatasource');

const schema = datasource.Schema({
    dataServico: String,
    idCliente: Number,
    createDate: Date
});

schema.index({createDate: 1}, {expireAfterSeconds: 864000});

let servico = datasource.model('Servico', schema, 'ServicosMonitriip');

safira.defineObject(servico, 'servico');