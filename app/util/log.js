let winston = require('winston');
let config = require('../bootstrap/config-bootstrap')();

winston.emitErrs = true;

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'info-file',
            level: 'info',
            filename: config.log.info.path,
            handleExceptions: true,
            json: true,
            maxsize: config.log.info.maxSize,
            maxFiles: config.log.info.maxFiles,
            colorize: false
        }),
        new winston.transports.Console({
            name: 'info-console',
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.File({
            name: 'erro-file',
            level: 'error',
            filename: config.log.erro.path,
            handleExceptions: true,
            json: true,
            maxsize: config.log.erro.maxSize,
            maxFiles: config.log.erro.maxFiles,
            colorize: false
        }),
         new winston.transports.Console({
            name: 'erro-console',
            level: 'error',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
