const Sequelize = require('sequelize');
let sequelize = require('../database/frota')();

Motorista = sequelize.define('motorista',{
    nomeFuncionario:{
        type:Sequelize.STRING,
        field:'nm_nomeFuncionario'
    },
    idMotorista:{
        type:Sequelize.BIGINT,
        field:'id_funcionario',
        primaryKey:true
    },
    cpf:{
        type:Sequelize.STRING,
        field:'nm_cpf'
    },
    flAtivo:{
        type:Sequelize.BIGINT,
        field:'fl_ativo'
    }
},{
    tableName:'funcionario',
    undescored:true,
    timestamps:false
});

module.exports = Motorista;