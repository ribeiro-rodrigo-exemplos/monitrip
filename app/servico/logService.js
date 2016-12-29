let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];

module.exports = () =>
    class LogService{
        constructor(logDTO){
            this._LogDTO = logDTO;
        }

        salvar(log){
            return new Promise((resolve,reject) => {
                amqp.connect(amqpConfig.url,(erro,connection) => {
                    
                    if(erro){
                        reject(erro);
                        return;
                    }
                        
                    connection.createChannel((err,channel) => {
                        
                        if(err)
                            reject(err);
                        
                        let queue = amqpConfig.queue;

                        channel.assertQueue(queue,{durable:false});
                        channel.sendToQueue(queue,Buffer.from(this._converterMensagem(log)),{persistent:true});
                        this._fechar(connection);

                        resolve();
                    });
                });
            });
            
        }

        _converterMensagem(log){
            let dto = this._LogDTO.toDTO('logs','insert',log);
            return JSON.stringify(dto);
        }

        _fechar(connection){
            setTimeout(() => connection.close(),500);
        }
    }
