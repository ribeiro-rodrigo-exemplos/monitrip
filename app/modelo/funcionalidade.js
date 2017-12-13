const Sequelize = require('sequelize');
const safira = require('safira');

const datasource = safira.bean('ssoDatasource');

let Licenca = safira.bean('licenca');
let Cliente = safira.bean('cliente');

let Funcionalidade = datasource.define('funcionalidade', {
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

safira.defineObject(Funcionalidade,'funcionalidade');

