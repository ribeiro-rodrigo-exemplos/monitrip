var mysql = require('mysql');

function createDBConnection(app){
  return mysql.createConnection({
    host:'172.16.193.32',
    user:'frota',
    password:'frota',
    database:'frota_zn4'
  });
}

module.exports = function(){
  return createDBConnection;
}

