const Sequelize = require('sequelize');
const safira = require('safira');

let sequelize = require('../database/sso')();
let Licenca = require('./licenca');

const Cliente = sequelize.define('cliente', {
    id: {
        type: Sequelize.BIGINT,
        field: 'id_cliente',
        primaryKey: true
    }
}, {
    tableName: 'cliente',
    undescored: true,
    timestamps: false
})

safira.defineObject(Cliente, 'cliente');

