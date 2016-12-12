var mysql = require('mysql');
var config = require('../../config/m2m-config')();

function createDBConnection(url){
  return mysql.createConnection({
    host:config.mysql.host,
    user:config.mysql.username,
    password:config.mysql.password,
    database:config.mysql.database
  });
}

module.exports = function(){
  return createDBConnection;
}

