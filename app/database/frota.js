var mysqlConfig = require('../bootstrap/config-bootstrap')()["mysql"]["frota"];
const Sequelize = require('sequelize');

let sequelize = new Sequelize(mysqlConfig.database,mysqlConfig.username,mysqlConfig.password,{
    host:mysqlConfig.host,
    dialect:'mysql',
    logging:false,
    pool:{
        max:10,
        min:0,
        idle:10000
    }
});

module.exports = () => sequelize;