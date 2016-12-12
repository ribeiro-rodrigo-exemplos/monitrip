let schema = require('../../config/mongodb-config')();

Linha = schema.define('Linha',{
    id:{type:schema.String},
    numero:{type:schema.String},
    atualizacao:{type:schema.Date},
    descr:{type:schema.String},
    trajetos:{type:schema.Json}
},{
    primaryKeys:['id']
});

module.exports = () => Linha 