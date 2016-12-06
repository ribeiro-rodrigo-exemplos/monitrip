var mysql = require('mysql');
var config = require('../config/m2m-config')();

function createDBConnection(app){
  return mysql.createConnection({
    host:config.mysql.url,
    user:config.mysql.user,
    password:config.mysql.password,
    database:config.mysql.database
  });
}

module.exports = function(){
  return createDBConnection;
}

