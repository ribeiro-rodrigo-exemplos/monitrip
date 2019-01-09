module.exports = {
    mysql: {
        frota: {
            host: process.env['MYSQL_FROTA_HOST'], 
            database: process.env['MYSQL_FROTA_DATABASE'],
            username: process.env['MYSQL_FROTA_USERNAME'], 
            password: process.env['MYSQL_FROTA_PASSWORD'], 
            port: process.ev['MYSQL_FROTA_PORT']
        }, 
        sso: {
            host: process.env['MYSQL_SSO_HOST'], 
            database: process.env['MYSQL_SSO_DATABASE'], 
            username: process.env['MYSQL_SSO_USERNAME'], 
            password: process.env['MYSQL_SSO_PASSWORD'], 
            port: process.env['MYSQL_SSO_PORT'] 
        },
    }, 
    amqp:{
        url: `amqp://${process.env['RABBITMQ_HOST']}`, 
        exchange: process.env['LOGS_EXCHANGE'],
        routingKey: process.env['LOGS_ROUTINGKEY'], 
    }, 
    lazypersistence: {
        database: process.env['LAZYPERSISTENCE_DATABASE']
    }, 
    mongodb: {
        url: process.env['MONGO_MONITRIIP_URL']
    }, 
    sso: {
        url: process.env['SSO_URL']
    }, 
    server: {
        port: 3005
    }, 
    workerProcessamento: {
        api: `http://${process.env['WORKER_PROCESSAMENTO_HOST']}:${process.env['WORKER_PROCESSAMENTO_PORT']}`
    }, 
    workerServico:{
        api: `http://${process.env['WORKER_SERVICO_HOST']}:${process.env['WORKER_SERVICO_PORT']}`
    }, 
    jwt:{
        apikey: "M2MParceiroKey", 
        webkey: "m2m"
    }, 
    log:{
        path: "/var/log", 
        maxSize: 100000, 
        maxFiles: 10, 
        file: {
            erro: "m2m-monitriip-erro.log",
            info: "m2m-monitriip-info.log"
        } 
    }, 
    rjConsultores:{
        url: `${process.env['RJ_CONSULTORES_URL']}`,
        authorization: "Basic bTJtOnJqbTJtcmo="
    } 
}