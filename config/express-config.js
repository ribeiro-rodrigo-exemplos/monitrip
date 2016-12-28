let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let validator = require('express-validator');

let errorInterceptor = require('../app/middleware/errorInterceptor')();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());

app.set('jwt_key','M2MParceiroKey');

consign({cwd:'app'})
    .include('util')
    .then('database')
    .then('modelo/licenca.js')
    .then('modelo')
    .then('repositorio')
    .then('servico')
    .then('middleware')
    .then('controlador')
    .then('rota/authRoutes.js')
    .then('rota')
    .into(app);

app.use(errorInterceptor.intercept.bind(errorInterceptor));

module.exports = () => app;


