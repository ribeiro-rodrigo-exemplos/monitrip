const Sequelize = require('sequelize');
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

module.exports = Veiculo;

