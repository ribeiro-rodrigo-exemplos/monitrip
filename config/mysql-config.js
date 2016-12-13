let caminte = require('caminte');
let mysqlConfig = require('./m2m-config')()["mysql"];

mysqlConfig.driver = 'mysql';
mysqlConfig.pool = true;

let schema = new caminte.Schema(mysqlConfig.driver,mysqlConfig);

module.exports = () => schema