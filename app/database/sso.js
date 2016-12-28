var mysqlConfig = require('../../config/m2m-config')()["mysql"]
const Sequelize = require('sequelize');

let sequelize = new Sequelize(mysqlConfig.databases.sso,mysqlConfig.username,mysqlConfig.password,{
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