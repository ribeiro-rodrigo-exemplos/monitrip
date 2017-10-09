let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let validator = require('express-validator');
let logger = require('../util/log');
let morgan = require('morgan');
let compression = require('compression');
let mung = require('express-mung');
let etag = require('etag');

let ErrorInterceptor = require('../middleware/errorInterceptor')();
let CorsInterceptor = require('../middleware/corsInterceptor')();
let customValidations = require('../util/customValidations')();

let app = express();

app.use(morgan("common",{
    stream:{
        write(mensagem){
            logger.info(mensagem);
        }
    }
}));

app.use(compression({
    filter(req,res){
        return req.headers['accept-encoding'] && req.headers['accept-encoding'].split(',').includes('gzip');
    }
}));

app.use(mung.json(function(body,req,res){
 
    res.etag = etag(JSON.stringify(body));
    const etagRequest = req.headers['if-none-match'];

    if(etagRequest != res.etag)
        return body;

    res.cacheControl = true;
    
    return null;
}));

app.use(mung.headers(function(req,res){
    
    if(res.cacheControl)
        res.status(304);
    
    if(res.etag)
        res.set('ETag',res.etag);

})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(CorsInterceptor.intercept);
app.use(validator({
    customValidators:customValidations
}));

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


