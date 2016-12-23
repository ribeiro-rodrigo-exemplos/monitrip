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
        field:'fl_excluido'
    },
    id:{
        type:Sequelize.BIGINT,
        field:'id_cliente',
        primaryKey:true
    }

},{
    tableName:'dispositivo',
    undescored:true,
    timestamps:false
});
    
    Dispositivo.belongsTo(app.modelo.cliente,{as:'Cliente',foreignKey:'id_cliente'});

    return Dispositivo;
}

