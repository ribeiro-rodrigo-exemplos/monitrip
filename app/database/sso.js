const safira = require('safira');

const mysqlConfig = safira.bean('config').mysql.sso;
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

safira.defineObject(sequelize,'ssoDatasource');