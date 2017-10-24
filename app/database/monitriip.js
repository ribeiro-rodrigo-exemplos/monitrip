const safira = require('safira');
const mongoose = require('mongoose');

let logger = safira.bean('logger');
let config =  safira.bean('config');

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
    logger.info('conectando ao mongodb');
});

mongoose.connection.on('connected',() => {
    logger.info('conectado ao mongodb');
});

mongoose.connection.on('error',() => {
    logger.error('Erro ao conectar com o mongodb');
    setTimeout(connect,2000);
});

mongoose.connection.on('reconnected',() => {
    logger.info('reconectado ao mongodb');
});

mongoose.connection.on('disconnected',() => {
    logger.info('finalizando conexão com o mongodb');
});

process.on('SIGINT',() => {
    logger.info('encerrando o Monitriip');
    mongoose.connection.close(() => process.exit(0));
});

connect();

safira.defineObject(mongoose,'monitriipDatasource')
