const Sequelize = require('sequelize');
const safira = require('safira');

const datasource = safira.bean('frotaDatasource');

Motorista = datasource.define('motorista', {
    nomeFuncionario: {
        type: Sequelize.STRING,
        field: 'nm_nomeFuncionario'
    },
    idMotorista: {
        type: Sequelize.BIGINT,
        field: 'id_funcionario',
        primaryKey: true
    },
    cpf: {
        type: Sequelize.STRING,
        field: 'nm_cpf'
    },
    flAtivo: {
        type: Sequelize.BIGINT,
        field: 'fl_ativo'
    },
    flSituacao: {
        type: Sequelize.BIGINT,
        field: ' fl_situacao'
    }
}, {
    tableName: 'funcionario',
    undescored: true,
    timestamps: false
});

safira.defineObject(Motorista, 'motorista');