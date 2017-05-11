let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(logDTO) {
            this._LogDTO = logDTO;
        }

        salvar(log) {
            return new Promise((resolve, reject) => {
                amqp.connect(amqpConfig.url, (erro, connection) => {

                    if (erro) {
                        reject(erro);
                        return;
                    }

                    connection.createChannel((err, channel) => {

                        if (err)
                            reject(err);

                        let queue = amqpConfig.queue;

                        channel.assertQueue(queue, {durable: true});
                        channel.sendToQueue(queue, Buffer.from(this._converterMensagem(log)), {
                            persistent: true,
                            contentType: 'text/plain',
                            contentEncoding: 'utf-8'
                        });
                        this._fechar(connection);

                        resolve();
                    });
                });
            });

        }

        _converterMensagem(log) {
            let dto = this._LogDTO.toDTO('logsMonitrip', 'insert', log);
            logger.info(`LogService - _converterMensagem - log: ${log}`);

            return JSON.stringify(dto);
        }

        _fechar(connection) {
            setTimeout(() => connection.close(), 500);
        }
    };
