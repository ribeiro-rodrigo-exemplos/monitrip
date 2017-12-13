const Sequelize = require('sequelize');
const safira = require('safira');

const datasource = safira.bean('ssoDatasource');

let Licenca = datasource.define('licenca', {
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