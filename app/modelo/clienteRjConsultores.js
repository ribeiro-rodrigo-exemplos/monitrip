const Sequelize = require('sequelize');
const safira = require('safira');

let sequelize = require('../database/sso')();

const ClienteRjConsultores = sequelize.define('clienteRjConsultores',
    {
        id:{
            type: Sequelize.BIGINT,
            field: 'id',
            primaryKey: true
        },
        idCliente:{
            type: Sequelize.BIGINT,
            field:'id_cliente' 
        },
        codigoCliente:{
            type: Sequelize.STRING,
            field:'cod_cliente'
        },
        codigoConexao:{
            type:Sequelize.STRING,
            field:'cod_conexao'
        }
    },
    {
        tableName:'cliente_rjconsultores',
        undescored:false,
        timestamps:false 
    }
); 

safira.defineObject(ClienteRjConsultores,'clienteRjConsultores');