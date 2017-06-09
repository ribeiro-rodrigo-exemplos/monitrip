let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(dateUtil) {
            this._dateUtil = dateUtil; 
        }

        salvar(log,queue,queueConfig) {
            return new Promise((resolve, reject) => {
                amqp.connect(amqpConfig.url, (erro, connection) => {

                    if (erro) {
                        reject(erro);
                        return;
                    }

                    connection.createChannel((err, channel) => {

                        if (err)
                            reject(err);

                        log.dataHoraEvento = this._dateUtil.formatarParaIsoDate(log.dataHoraEvento);

                        this._enviarMensagem(channel,queue,this._converterMensagem(log),queueConfig);

                        this._fechar(connection);

                        resolve();
                    });
                });
            });
        }

        _enviarMensagem(channel,queue,mensagem,optionsQueue){
            channel.assertQueue(queue,optionsQueue);
            channel.sendToQueue(queue, Buffer.from(mensagem), {
                persistent: true,
                contentType: 'text/plain',
                contentEncoding: 'utf-8'
            });
        }

        _converterMensagem(log) {
            logger.info(`LogService - _converterMensagem - log: ${log}`);
            return JSON.stringify(log);
        }

        _fechar(connection) {
            setTimeout(() => connection.close(), 500);
        }
    };
