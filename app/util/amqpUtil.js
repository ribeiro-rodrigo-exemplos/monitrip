let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () => 
    class AmqpUtil{

        enviarMensagem(mensagem,queue,queueConfig,mensagemConfig) {
            
            logger.info(`AmqpUtil - enviarMensagem - mensagem: ${mensagem},queue - ${queue}, queueConfig - ${queueConfig}`);

            if(this._connection)
                this._enviarParaFila(mensagem,queue,queueConfig,mensagemConfig);
            else
                return this._criarConexao()
                    .then(() => this._enviarParaFila(mensagem,queue,queueConfig,mensagemConfig))
        }

        _criarConexao(){
            return new Promise((resolve, reject) => {
                amqp.connect(amqpConfig.url, (erro, connection) => {

                    if (erro) {
                        reject(new Error(erro.message));
                        return;
                    }

                    connection.createChannel((err, channel) => {

                        if (err){
                            reject(err);
                            return;
                        }
                            
                        this._channel = channel;
                        this._connection = connection;  

                        resolve();
                    });
                });
            });
        }

        _enviarParaFila(mensagem,queue,queueConfig,mensagemConfig){
            try{
                this._channel.assertQueue(queue,queueConfig);
                this._channel.sendToQueue(queue, Buffer.from(JSON.stringify(mensagem)),mensagemConfig);
            }
            catch(e){
                this._connection = null; 
                this._channel = null;
                throw new Error('A conexão com o Rabbitmq foi encerrada'); 
            }
        }
    }