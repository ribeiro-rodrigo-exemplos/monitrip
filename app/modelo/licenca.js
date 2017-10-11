const Sequelize = require('sequelize');
const safira = require('safira');

let sequelize = require('../database/sso')();

let Licenca = sequelize.define('licenca', {
    quantidade: {
        type: Sequelize.BIGINT,
        field: 'nu_licenca'
    }
}, {
    tableName: 'cliente_funcionalidade',
    undescored: true,
    timestamps: false
})

safira.defineObject(Licenca, 'licenca');