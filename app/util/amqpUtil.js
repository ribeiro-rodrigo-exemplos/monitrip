let amqp = require('amqplib/callback_api');
const safira = require('safira');

class AmqpUtil{

    constructor(logger,config){
        this._logger = logger;
        this._amqpConfig = config.amqp;
        this._exchange = config.amqp.exchange; 
        this._routingKey = config.amqp.routingKey;
    }

    enviarMensagem(mensagem,mensagemConfig) {
        
        this._logger.info(`AmqpUtil - enviarMensagem - mensagem: ${mensagem}, mensagemConfig - ${mensagemConfig}`);

        if(this._connection)
            this._enviar(mensagem,mensagemConfig);
        else
            return this._criarConexao()
                .then(() => this._enviar(mensagem,mensagemConfig))
    }

    _criarConexao(){
        return new Promise((resolve, reject) => {
            amqp.connect(this._amqpConfig.url, (erro, connection) => {

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

    _enviar(mensagem,mensagemConfig){
        try{
            this._channel.assertExchange(this._exchange,'topic',{durable:true})
            this._channel.publish(this._exchange,this._routingKey,Buffer.from(JSON.stringify(mensagem)),mensagemConfig)
        }
        catch(e){
            this._connection = null; 
            this._channel = null;
            throw new Error('A conexão com o Rabbitmq foi encerrada'); 
        }
    }
}

safira.define(AmqpUtil);