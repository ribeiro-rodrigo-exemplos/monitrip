const os = require('os');
const cluster = require('cluster');

function criarClusters(){
    os.cpus()
    .forEach(() => cluster.isMaster ? cluster.fork() : require('./app/bootstrap/bootstrap'));
}

process.env["NODE_ENV"] == 'production' ? criarClusters() : require('./app/bootstrap/bootstrap');