let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let validator = require('express-validator');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());

consign({cwd:'app'})
    .include('controladores')
    .then('rotas')
    .then('database')
    .then('modelo')
    .then('util')
    .into(app);

module.exports = () => app;


