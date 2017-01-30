const Sequelize = require('sequelize');

module.exports = app => {
    
    let sequelize = app.database.sso;
    
    let Licenca = sequelize.define('licenca',{
        quantidade:{
            type:Sequelize.BIGINT,
            field:'nu_licenca'
        }
    },{
        tableName:'cliente_funcionalidade',
        undescored:true,
        timestamps:false
    })

    return Licenca; 
}


