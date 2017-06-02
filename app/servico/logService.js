let amqp = require('amqplib/callback_api');
let amqpConfig = require('../bootstrap/config-bootstrap')()['amqp'];
const logger = require('../util/log');

module.exports = () =>
    class LogService {
        constructor(logDTO,dateUtil) {
            this._LogDTO = logDTO;
            this._dateUtil = dateUtil; 
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

                        let servicoPersistenciaQueue = amqpConfig['servico-persistencia'];
                        let workerProcessamentoQueue = amqpConfig['worker-processamento']['queue'];

                        this._enviarMensagem(channel,servicoPersistenciaQueue,
                            this._converterMensagem(this._LogDTO.toDTO('logsMonitrip', 'insert', log)),
                            {durable: true});

                        log.dataHoraEvento = this._dateUtil.formatarParaIsoDate(log.dataHoraEvento);

                        this._enviarMensagem(channel,workerProcessamentoQueue,this._converterMensagem(log),{
                            durable: true,
                            deadLetterExchange:amqpConfig['worker-processamento']['exchange-dlq'],
                            deadLetterRoutingKey:amqpConfig['worker-processamento']['routing-key-dql']
                        });

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
