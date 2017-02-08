let winston = require('winston');
let config = require('../bootstrap/config-bootstrap')();

winston.emitErrs = true;

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: config.log.path,
            handleExceptions: true,
            json: true,
            maxsize: 100000,
            maxFiles: 10,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
