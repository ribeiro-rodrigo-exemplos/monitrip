const Sequelize = require('sequelize');

module.exports = app => {

    let sequelize = app.database.sso;
    let Licenca = app.modelo.licenca;
    
    const Cliente = sequelize.define('cliente',{
            id:{
                type:Sequelize.BIGINT,
                field:'id_cliente',
                primaryKey:true
            }
        },{
            tableName:'cliente',
            undescored:true,
            timestamps:false
        })

    return Cliente;
}