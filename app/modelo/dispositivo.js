const Sequelize = require('sequelize');

module.exports = app => {
    
    let sequelize = app.database.frota;
    
    Dispositivo = sequelize.define('dispositivo',{

    imei:{
        type:Sequelize.STRING,
        field:'nu_imei'
    },
    descricao:{
        type:Sequelize.STRING,
        field:'tx_descricao'
    },
    excluido:{
        type:Sequelize.BIGINT,
        field:'fl_excluido',
        defaultValue:0
    },
    id:{
        type:Sequelize.BIGINT,
        field:'id_dispositivo',
        autoIncrement:true,
        primaryKey:true
    },
    idCliente:{
        type:Sequelize.BIGINT,
        field:'id_cliente'
    }

},{
    tableName:'dispositivo',
    undescored:true,
    timestamps:false
});
    
    Dispositivo.belongsTo(app.modelo.cliente,{as:'Cliente',foreignKey:'idCliente'});

    return Dispositivo;
}

