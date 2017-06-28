let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () => 
    class AmqpUtil{

        enviarMensagem(mensagem,queue,queueConfig,mensagemConfig) {
            
            logger.info(`AmqpUtil - enviarMensagem - mensagem: ${mensagem},queue - ${queue}, queueConfig - ${queueConfig}`);

            return new Promise((resolve, reject) => {
                amqp.connect(amqpConfig.url, (erro, connection) => {

                    if (erro) {
                        reject(erro);
                        return;
                    }

                    connection.createChannel((err, channel) => {

                        if (err)
                            reject(err);

                        this._enviarMensagem(channel,queue,this._converterMensagem(mensagem),queueConfig,mensagemConfig);

                        this._fechar(connection);

                        resolve();
                    });
                });
            });
        }

        _enviarMensagem(channel,queue,mensagem,optionsQueue,optionsMensagem){

            let mensagemConfig = Object.assign({
                contentType: 'text/plain',
                persistent: true,
                contentEncoding: 'utf-8'
            },optionsMensagem); 

            console.log(mensagemConfig);

            channel.assertQueue(queue,optionsQueue);
            channel.sendToQueue(queue, Buffer.from(mensagem),mensagemConfig);
        }

        _converterMensagem(mensagem) {
            logger.info(`AmqpUtil - _converterMensagem - mensagem: ${mensagem}`);
            return JSON.stringify(mensagem);
        }

        _fechar(connection) {
            setTimeout(() => connection.close(), 500);
        }
    }