let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let validator = require('express-validator');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(validator());

app.set('jwt_key','M2MParceiroKey');

consign({cwd:'app'})
    .include('servico')
    .then('database')
    .then('util')
    .then('repositorio')
    .then('controlador')
    .then('rota')
    .into(app);

app.use((error,req,res,next) => {
    console.log(error);
    if(error.status){
        res.status(error.status)
            .send(error.message);
        return;
    }
    
    res.status(500)
        .send('Ocorreu um erro ao processar a requisição solicitada, tente novamente mais tarde');
})

module.exports = () => app;


