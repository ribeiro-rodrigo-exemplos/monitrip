let schema = require('../../config/mysql-config')();

let Veiculo = schema.define('veiculo',{
    "id_veiculo":{type:schema.Number},
    "cod_veiculo":{type:schema.String},
    "fl_ativo":{type:schema.Number},
    "vl_placa":{type:schema.String},
    "dt_atualizacao":{type:schema.String},
    "id_cliente":{type:schema.Number}
},{
    primaryKeys:['id_veiculo']
});

module.exports = () => Veiculo