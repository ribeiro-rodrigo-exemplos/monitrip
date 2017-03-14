const Sequelize = require('sequelize');

module.exports = app => {

    let sequelize = app.database.sso;

    let Licenca = app.modelo.licenca;
    let Cliente = app.modelo.cliente;

    let Funcionalidade = sequelize.define('funcionalidade', {
        nome: {
            type: Sequelize.STRING,
            field: 'nm_funcionalidade'
        },
        idFuncionalidade: {
            type: Sequelize.BIGINT,
            field: 'id_funcionalidade',
            primaryKey: true
        }
    }, {
        tableName: 'funcionalidade',
        undescored: true,
        timestamps: false
    })

    Funcionalidade.belongsToMany(Cliente, {through: Licenca, foreignKey: 'id_funcionalidade'});
    Cliente.belongsToMany(Funcionalidade, {through: Licenca, as: 'Funcionalidades', foreignKey: 'id_cliente'});

    return Funcionalidade;
}
