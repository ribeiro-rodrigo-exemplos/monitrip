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

                        channel.assertQueue(queue,queueConfig);
                        channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensagem)),mensagemConfig,(err,ok) => connection.close());

                        resolve();
                    });
                });
            });
        }
    }