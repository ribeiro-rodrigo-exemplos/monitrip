const Sequelize = require('sequelize');
const safira = require('safira');

const cliente = safira.bean('cliente');
const datasource = safira.bean('frotaDatasource');

Dispositivo = datasource.define('dispositivo', {

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