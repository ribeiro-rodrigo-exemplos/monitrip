let mongoose = require('mongoose');

if(mongoose.connection.readyState)
    return;

mongoose.connect('mongodb://172.16.193.9:27017/m2mfrota');

mongoose.connection.on('connected',() => console.log('conectado ao mongodb'));
mongoose.connection.on('disconnected',() => console.log('finalizando conexão com o mongodb'));

console.log('modulo carregado')




