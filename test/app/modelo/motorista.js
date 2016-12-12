let schema = require('../../config/mysql-config')();

Motorista = schema.define('funcionario',{
    "nm_matricula":{type:schema.String},
    "nm_nomeFuncionario":{type:schema.String},
    "nm_cpf":{type:schema.String},
    "vl_sexo":{type:schema.String},
    "dt_atualizacao":{type:schema.String},
    "fl_ativo":{type:schema.Number},
},{
    primaryKeys:['nm_cpf']
});

module.exports = () => Motorista