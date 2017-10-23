const Sequelize = require('sequelize');
const safira = require('safira');
let cliente = safira.bean('cliente');

let sequelize = require('../database/frota')();
Dispositivo = sequelize.define('dispositivo', {

    imei: {
        type: Sequelize.STRING,
        field: 'nu_imei'
    },
    descricao: {
        type: Sequelize.STRING,
        field: 'tx_descricao'
    },
    excluido: {
        type: Sequelize.BIGINT,
        field: 'fl_excluido',
        defaultValue: 0
    },
    id: {
        type: Sequelize.BIGINT,
        field: 'id_dispositivo',
        autoIncrement: true,
        primaryKey: true
    },
    idCliente: {
        type: Sequelize.BIGINT,
        field: 'id_cliente'
    }

}, {
    tableName: 'dispositivo',
    undescored: true,
    timestamps: false
});

Dispositivo.belongsTo(cliente, {as: 'Cliente', foreignKey: 'idCliente'});

safira.defineObject(Dispositivo,'dispositivo');