const os = require('os');
const cluster = require('cluster');

function criarClusters(){
    os.cpus()
    .forEach(() => cluster.isMaster ? cluster.fork() : require('./app/bootstrap/bootstrap'));
}

process.env["NODE_ENV"] == 'production' ? criarClusters() : require('./app/bootstrap/bootstrap');



/* const app = require('./app/bootstrap/express-bootstrap')();
const config = require('./app/bootstrap/config-bootstrap')();
let log = require('./app/util/log');

app.listen(config.server.port, function () {
    log.debug(`Servidor rodando na porta ${config.server.port}`);
    log.info(`Servidor rodando na porta ${config.server.port}`);
});

 */