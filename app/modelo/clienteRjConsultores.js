const Sequelize = require('sequelize');

module.exports = app => {
    let sequelize = app.database.sso;

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

    return ClienteRjConsultores;
}