/**
 * Created by rodrigo.santos on 10/01/2017.
 */
const os = require('os');
const cluster = require('cluster');

function criarClusters(){
    os.cpus()
        .forEach(() => cluster.isMaster ? cluster.fork() : require('./server'));
}

process.env["NODE_ENV"] == 'production' ? criarClusters() : require('./server');


