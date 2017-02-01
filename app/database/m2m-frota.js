let mongoose = require('mongoose');
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

mongoose.connection.on('connecting',() => console.log('conectando ao mongodb'));
mongoose.connection.on('connected',() => console.log('conectado ao mongodb'));
mongoose.connection.on('error',() => {
   console.log('Erro ao conectar com o mongodb');
    connect();
});
mongoose.connection.on('reconnected',() => console.log('reconectado ao mongodb'));
mongoose.connection.on('disconnected',() => console.log('finalizando conexão com o mongodb'));

connect();

process.on('SIGINT',() => {
    console.log('encerrando o Monitriip');
    mongoose.connection.close(() => process.exit(0));
})
