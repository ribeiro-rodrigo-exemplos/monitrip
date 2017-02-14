let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let validator = require('express-validator');
let log = require('../util/log');
let morgan = require('morgan');

let ErrorInterceptor = require('../middleware/errorInterceptor')();
let CorsInterceptor = require('../middleware/corsInterceptor')();

let app = express();

app.use(morgan("common",{
    stream:{
        write:function(mensagem){
            log.info(mensagem);
        }
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(CorsInterceptor.intercept);
app.use(validator());

app.set('jwt_api_key','M2MParceiroKey');
app.set('jwt_web_key','m2m');

consign({cwd:'app'})
    .include('util')
    .then('database')
    .then('modelo/licenca.js')
    .then('modelo')
    .then('repositorio')
    .then('servico')
    .then('middleware/GenericTokenInterceptor.js')
    .then('middleware')
    .then('controlador')
    .then('beans')
    .then('rota/authRoutes.js')
    .then('rota')
    .into(app);

app.use(ErrorInterceptor.intercept);

module.exports = () => app;


