const Sequelize = require('sequelize');
const safira = require('safira');

let sequelize = require('../database/frota')();

let Veiculo = sequelize.define("veiculo", {
    idVeiculo: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        field: "id_veiculo"
    },
    vlPlaca: {
        type: Sequelize.STRING,
        field: "vl_placa"
    },
    flAtivo: {
        type: Sequelize.BIGINT,
        field: "fl_ativo"
    }
}, {
    tableName: 'veiculo',
    undescored: true,
    timestamps: false
});

safira.defineObject(Veiculo, 'veiculo');

