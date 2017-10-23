const Sequelize = require('sequelize');
const safira = require('safira');

const datasource = safira.bean('ssoDatasource');

const ClienteRjConsultores = datasource.define('clienteRjConsultores',
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