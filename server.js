const app = require('./app/bootstrap/express-bootstrap')();
const config = require('./app/bootstrap/config-bootstrap')();

app.listen(config.server.port, function () {
    console.log(`Servidor rodando na porta ${config.server.port}`);
});











