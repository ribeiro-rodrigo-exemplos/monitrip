const Sequelize = require('sequelize');
const safira = require('safira');

const datasource = safira.bean('ssoDatasource');

const Cliente = datasource.define('cliente', {
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

