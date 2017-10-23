const mongoose = require('mongoose');
const safira = require('safira');

const schema = mongoose.Schema({
    dataServico: String,
    idCliente: Number,
    createDate: Date
});

schema.index({createDate: 1}, {expireAfterSeconds: 864000});

let servico = mongoose.model('Servico', schema, 'ServicosMonitriip');

safira.defineObject(servico, 'servico');