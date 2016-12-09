let mongoose = require('mongoose');
var config = require('../../config/m2m-config')();

if(mongoose.connection.readyState)
    return;

mongoose.connect(config.mongo.url);

mongoose.connection.on('connected',() => console.log('conectado ao mongodb'));
mongoose.connection.on('disconnected',() => console.log('finalizando conexão com o mongodb'));

console.log('modulo carregado')




