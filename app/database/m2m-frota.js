let mongoose = require('mongoose');
let log = require('../util/log');
var config = require('../bootstrap/config-bootstrap')();

if(mongoose.connection.readyState)
    return;

mongoose.Promise = global.Promise;

function connect(){
    mongoose.connect(config.mongodb.url,{server:{
        socketOptions:{
            connectTimeoutMS:30000 ,
            socketTimeoutMS:15000,
            keepAlive: 30000
        },
        reconnectInterval: 2000,
        reconnectTries: Number.MAX_VALUE
    }});
}



mongoose.connection.on('connecting',() => {
    log.debug('conectando ao mongodb');
    log.info('conectando ao mongodb');
});

mongoose.connection.on('connected',() => {
    log.debug('conectado ao mongodb');
    log.info('conectado ao mongodb');
});

mongoose.connection.on('error',() => {
    log.debug('Erro ao conectar com o mongodb');
    log.info('Erro ao conectar com o mongodb');    
    connect();
});

mongoose.connection.on('reconnected',() => {
    log.debug('reconectado ao mongodb');
    log.info('reconectado ao mongodb');
});

mongoose.connection.on('disconnected',() => {
    log.debug('finalizando conexão com o mongodb');
    log.info('finalizando conexão com o mongodb');
});

connect();

process.on('SIGINT',() => {
    log.debug('encerrando o Monitriip');
    log.info('encerrando o Monitriip');
    mongoose.connection.close(() => process.exit(0));
})
