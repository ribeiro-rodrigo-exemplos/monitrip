let amqp = require('amqplib/callback_api');
const safira = require('safira');
let amqpConfig =  safira.bean('config').amqp


class AmqpUtil{

    constructor(logger){
        this._logger = logger;
    }

    enviarMensagem(mensagem,queue,queueConfig,mensagemConfig) {
        
        this._logger.info(`AmqpUtil - enviarMensagem - mensagem: ${mensagem},queue - ${queue}, queueConfig - ${queueConfig}`);

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

safira.define(AmqpUtil);